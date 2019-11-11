// centralizar dialogs aqui referentes a esse contexto
import AddItemDialog from './AddItemDialog';
import EditItemDialog from './EditItemDialog';

const DialogTypes = type =>
  ({
    ADD_ITEM: AddItemDialog,
    EDIT_ITEM: EditItemDialog
  }[type]);

export default DialogTypes;
