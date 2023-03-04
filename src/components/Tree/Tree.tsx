import React, { useEffect } from 'react';
import { useStore } from 'effector-react';

import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ModalConfirm } from "../Modal/ModalConfirm";
import { ModalDefault } from '../Modal/ModalDefault';
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import Stack from "@mui/material/Stack";

import {
  fetchCreateChildrenTreeFx,
  fetchCreateTreeFx,
  fetchGetTreeFx,
  fetchDeleteFx,
  fetchRenameFx,
  $tree
} from '../../store/treeReducer';


interface RenderTree {
  children?: readonly RenderTree[];
  name: string;
  id: string;
}

type modal = "add" | "delete" | "rename"
const label = (name: string, id: string, selectedID: string, toggleModal: (e: any)=> void) => {
  return <div style={{display: "flex"}}><p>{name}</p>
    <Stack
      style={{display: selectedID !== id ? "none" : "flex"}}
      alignItems="center"
      direction="row"
      spacing={2}
    >
      <IconButton
        aria-label="upload picture"
        onClick={toggleModal}
        data-atribut="add"
        component="label"
        color="primary"
      >
        <ControlPointIcon />
      </IconButton>
      <IconButton
        aria-label="upload picture"
        onClick={toggleModal}
        data-atribut="rename"
        component="label"
        color="primary"
      >
        <EditIcon />
      </IconButton>
      <IconButton
        aria-label="upload picture"
        onClick={toggleModal}
        data-atribut="delete"
        component="label"
        color="primary"
      >
        <DeleteForeverOutlinedIcon />
      </IconButton>
    </Stack>
  </div>
}
export default function Tree() {
  const [showeModal, setShoweModal] = React.useState<modal | false>(false);
  const [selected, setSelected] = React.useState({id: '', treeName: ''});
  const treeStore = useStore($tree)

  useEffect(()=> {
    fetchGetTreeFx()
  }, [])

  const toggleModal = (e: any) => {
    const typeBtn = e?.currentTarget?.dataset?.atribut
    setShoweModal(typeBtn ?? false)
  }

  const onChangeTree = (value: string) => {
    switch (showeModal) {
      case "add": {
        fetchCreateChildrenTreeFx({parentNodeId: selected.id, treeName: selected.treeName, nodeName: value})
        break
      }
      case "rename": {
        fetchRenameFx({ treeName: selected.treeName, nodeId: selected.id, newNodeName: value })
        break
      }
    }
    setShoweModal(false)
  }
  const onDeleteHandler = () => {
    fetchDeleteFx({ treeName: selected.treeName, nodeId: selected.id })
    setShoweModal(false)
  }
  const handleSelect = (event: React.ChangeEvent<{}>, nodeIds: string) => {
    //@ts-ignore
    const name = event.currentTarget?.innerText
    setSelected({id: nodeIds, treeName: name});
  };
  const renderTree = (nodes: RenderTree) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={label(nodes.name, nodes.id, selected.id, toggleModal)} >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  )
  return (<>
      {!!treeStore
       ? <>
          <TreeView
          sx={{height: '100vh', flexGrow: 1, maxWidth: 'auto', overflowY: 'auto'}}
          defaultExpandIcon={<ChevronRightIcon/>}
          defaultCollapseIcon={<ExpandMoreIcon/>}
          onNodeSelect={handleSelect}
          defaultExpanded={['root']}
          aria-label="rich object"
        >
          {!!treeStore && renderTree(treeStore)}
        </TreeView>

      {showeModal === "add" &&
        <ModalDefault
          onToggleShowe={toggleModal}
          onChange={onChangeTree}
          txtBtnClose={"CANCEL"}
          txtBtnChange={"ADD"}
          showe={!!showeModal}
          txtTitle={"Add"}
        />}
      {showeModal === "rename" &&
        <ModalDefault
          onToggleShowe={toggleModal}
          txtBtnChange={"RENAME"}
          onChange={onChangeTree}
          txtBtnClose={"CANCEL"}
          showe={!!showeModal}
          txtTitle={"Rename"}
        />}

      {showeModal === "delete" &&
        <ModalConfirm
          onToggleShowe={toggleModal}
          onChange={onDeleteHandler}
          txtConfirm={'text base'}
          txtBtnChange={"DELETE"}
          txtBtnClose={"CANCEL"}
          showe={!!showeModal}
          txtTitle={"Delete"}
        />}
          </>
      : <Button onClick={()=> fetchCreateTreeFx()} variant="contained" size="small"> create static tree </Button>
    }
  </>)
}