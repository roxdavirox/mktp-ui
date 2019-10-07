import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ComposeTemplateStep from './steps/ComposeTemplateStep';
import Container from '@material-ui/core/Container';
import ConfirmStep from './steps/ConfirmStep';

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
    display: 'initial',
    paddingLeft: '20px',
    paddingRight: '20px'
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

function getSteps() {
  return [
    'Preencha as informações do Template',
    'Confirmar informações do Template'
  ];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <ComposeTemplateStep />;
    case 1:
      return <ConfirmStep />;
    default:
      return 'Uknown stepIndex';
  }
}

export default function HorizontalLabelPositionBelowStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="xl">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed
              </Typography>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              <div className={classes.buttons}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Voltar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? 'Finalizar' : 'Continuar'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
