// dialog types
// componentes de dialogo para Area
import AddPrice from './AddPrice';
import EditPrice from './EditPrice';
import GeneratePrice from './GeneratePrice.jsx';
import GenerateSimplePrice from './GenerateSimplePrice';

// componentes de dialogo para Quantiydade no intervalo
import AddPriceQuantity from './AddPriceQuantity';
import EditPriceQuantity from './EditPriceQuantity';
import GeneratePriceQty from './GeneratePriceQty.jsx';

import AjustarValoresPorcentage from './AjustarValoresPorcentage.jsx';

const DialogTypes = type =>
  ({
    ADD_PRICE: AddPrice,
    EDIT_PRICE: EditPrice,
    GENERATE_PRICE: GeneratePrice,
    GENERATE_PRICE_SIMPLE: GenerateSimplePrice,
    GENERATE_PRICE_QTY: GeneratePriceQty,
    ADD_PRICE_QUANTITY: AddPriceQuantity,
    EDIT_PRICE_QUANTITY: EditPriceQuantity,
    AJUSTAR_VALORES_PORCENTAGE: AjustarValoresPorcentage
  }[type]);

export default DialogTypes;
