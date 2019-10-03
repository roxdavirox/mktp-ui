import React from 'react';
import GridContainer from 'components/theme/Grid/GridContainer.jsx';
import GridItem from 'components/theme/Grid/GridItem.jsx';
import Datatable from './Datatable';

const ProductTemplatePage = () => {
  const data = [
    {
      items: [
        {
          options: ['5d6eece8a8f33e0004bd5718'],
          _id: '5d6eedaea8f33e0004bd571b',
          name: 'Aço inox 0,6mm',
          priceTableId: '5d5c5bad1984340004e847cf',
          createdAt: '2019-09-03T22:48:14.457Z',
          __v: 1
        },
        {
          options: ['5d6eece8a8f33e0004bd5718'],
          _id: '5d94bd94b72c5627a05cad30',
          name: 'Acrilico 4mm',
          createdAt: '2019-10-02T15:09:08.178Z',
          __v: 1
        }
      ],
      _id: '5d6eece8a8f33e0004bd5718',
      name: 'Material',
      createdAt: '2019-09-03T22:44:56.401Z',
      __v: 5
    },
    {
      items: [
        {
          options: ['5d74ecaa43a5da0004ff1abe'],
          _id: '5d94bf5ab72c5627a05cad32',
          name: 'Furo 2mm',
          createdAt: '2019-10-02T15:16:42.755Z',
          __v: 1
        }
      ],
      _id: '5d74ecaa43a5da0004ff1abe',
      name: 'Furo',
      createdAt: '2019-09-08T11:57:30.031Z',
      __v: 1
    }
  ];
  return <Datatable data={data} />;
};

export default ProductTemplatePage;
