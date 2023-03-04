import {createEffect, createStore} from 'effector'

const baseUrl = `https://test.vmarmysh.com/api.user.tree`
export const fetchGetTreeFx = createEffect(async () => {
  const res = await fetch(baseUrl + `.get?treeName=Indonesia-0123---`)
  return res.json()
})

export const fetchCreateTreeFx = createEffect(async () => {
  const res = await fetch(baseUrl + `.get?treeName=staticTreeTesting*01`, {
    method: "POST"
  })
  if(res.status === 200) {
    fetchGetTreeFx()
  }
})

interface ICreateAdd {
  parentNodeId: string
  treeName: string
  nodeName: string
}
export const fetchCreateChildrenTreeFx = createEffect(async ({ treeName, parentNodeId, nodeName }: ICreateAdd) => {
  const res = await fetch(baseUrl + `.node.create?treeName=${treeName}&parentNodeId=${parentNodeId}&nodeName=${nodeName}`,{
    method: "POST",
  })
  if(res.status === 200) {
    fetchGetTreeFx()
  }
})
interface IRename {
  newNodeName: string
  treeName: string
  nodeId: string
}
export const fetchRenameFx = createEffect(async ({ treeName, nodeId, newNodeName }: IRename) => {
  const res = await fetch(baseUrl + `.node.rename?treeName=${treeName}&nodeId=${nodeId}&newNodeName=${newNodeName}`,{
    method: "POST",
  })
  if(res.status === 200) {
    fetchGetTreeFx()
  }
})

interface IDelete {
  treeName: string
  nodeId: string
}
export const fetchDeleteFx = createEffect(async ({ treeName, nodeId }: IDelete) => {
  const res = await fetch(baseUrl + `.node.delete?treeName=${treeName}&nodeId=${nodeId}`,{
    method: "POST",
  })
  if(res.status === 200) {
    fetchGetTreeFx()
  }
})

export const $tree = createStore<null | any>(null)
  .on(fetchGetTreeFx.done, (state, result) =>  result.result)
