import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { FC } from "react";

const TXT_CLOSE_DEFOULT_CANCEL = 'CANCEL'
const TXT_CHANGE_DEFOULT_ADD = 'ADD'
const TXT_TITLE_DEFOULT_ADD = 'Add'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: '4px',
  boxShadow: '0px 11px 15px -7px rgb(0 0 0 / 20%)',
};
interface IModal {
  onToggleShowe: (value: boolean) => void
  txtBtnChange?: string
  txtBtnClose?: string
  onChange: () => void
  txtConfirm: string
  txtTitle?: string
  showe: boolean
}
export const ModalConfirm: FC<IModal> = ({
                                             txtBtnClose = TXT_CLOSE_DEFOULT_CANCEL,
                                             txtBtnChange = TXT_CHANGE_DEFOULT_ADD,
                                             txtTitle = TXT_TITLE_DEFOULT_ADD,
                                             onToggleShowe,
                                           txtConfirm,
                                           onChange,
                                    showe,
                      }) => {


  return (
    <Modal
      aria-describedby="modal-modal-description"
      aria-labelledby="modal-modal-title"
      onClose={() => onToggleShowe(false)}
      open={showe}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" padding='16px' >
          {txtTitle}
        </Typography>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '-webkit-fill-available' },
            borderTop: '1px solid rgba(0, 0, 0, 0.12)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            padding: '16px 8px'
          }}
          noValidate
          autoComplete="off"
        >
          <Typography variant="h1" component="h2">
            {txtConfirm}
          </Typography>
        </Box>
        <Stack spacing={2} direction="row" sx={{display: 'flex', justifyContent: 'end', padding: '16px 8px 8px 0'}}>
          <Button onClick={() => onToggleShowe(false)} variant="outlined">{txtBtnClose}</Button>
          <Button onClick={onChange} variant="contained">{txtBtnChange}</Button>
        </Stack>
      </Box>
    </Modal>
  )
}