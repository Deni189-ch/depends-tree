import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { FC } from "react";

const TXT_CLOSE_DEFOULT_CANCEL = 'CANCEL'
const TXT_CHANGE_DEFOULT_ADD = 'ADD'
const TXT_TITLE_DEFOULT_ADD = 'Add'

const style = {
  boxShadow: '0px 11px 15px -7px rgb(0 0 0 / 20%)',
  position: 'absolute' as 'absolute',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '4px',
  top: '50%',
  left: '50%',
  width: 500,
};
interface IModal {
  onToggleShowe: (value: boolean) => void
  onChange: (value: string) => void
  initialValue?: string
  txtBtnChange?: string
  txtBtnClose?: string
  txtTitle?: string
  showe: boolean
}
export const ModalDefault: FC<IModal> = ({
                                           txtBtnClose = TXT_CLOSE_DEFOULT_CANCEL,
                                           txtBtnChange = TXT_CHANGE_DEFOULT_ADD,
                                           txtTitle = TXT_TITLE_DEFOULT_ADD,
                                           initialValue = '',
                                           onToggleShowe,
                                           onChange,
                                           showe,
                      }) => {
const [value, setValue] = React.useState(initialValue)

  return (
    <Modal
      aria-describedby="modal-modal-description"
      onClose={()=> onToggleShowe(false)}
      aria-labelledby="modal-modal-title"
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
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            borderTop: '1px solid rgba(0, 0, 0, 0.12)',
            padding: '16px 8px'
          }}
          noValidate
          autoComplete="off"
        >
          <TextField value={value} onChange={(e) => {setValue(e.currentTarget.value)}
          } id="outlined-basic" label="Outlined" variant="outlined" />
        </Box>
        <Stack spacing={2} direction="row" sx={{display: 'flex', justifyContent: 'end', padding: '16px 8px 8px 0'}}>
          <Button onClick={()=> onToggleShowe(false)} variant="outlined">{txtBtnClose}</Button>
          <Button onClick={()=> onChange(value)} variant="contained">{txtBtnChange}</Button>
        </Stack>
      </Box>
    </Modal>
  )
}