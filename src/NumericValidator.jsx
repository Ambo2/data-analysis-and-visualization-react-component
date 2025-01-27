/**
 * NumericValidator component.
 *
 * @component
 */
const NumericValidator = () => null;

NumericValidator.validateData = async (data) => {
  // Perform validation (example: check if all data are numbers)
  if (data.every(item => typeof item === 'number')) {
    return data;
  } else {
    throw new Error('Validation failed: Data must be numeric.');
  }
};

export default NumericValidator;
