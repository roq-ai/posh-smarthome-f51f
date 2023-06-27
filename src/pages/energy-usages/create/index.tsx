import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createEnergyUsage } from 'apiSdk/energy-usages';
import { Error } from 'components/error';
import { energyUsageValidationSchema } from 'validationSchema/energy-usages';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { EnergyUsageInterface } from 'interfaces/energy-usage';

function EnergyUsageCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: EnergyUsageInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createEnergyUsage(values);
      resetForm();
      router.push('/energy-usages');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<EnergyUsageInterface>({
    initialValues: {
      energy_consumption: 0,
      timestamp: new Date(new Date().toDateString()),
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: energyUsageValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Energy Usage
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="energy_consumption" mb="4" isInvalid={!!formik.errors?.energy_consumption}>
            <FormLabel>Energy Consumption</FormLabel>
            <NumberInput
              name="energy_consumption"
              value={formik.values?.energy_consumption}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('energy_consumption', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.energy_consumption && (
              <FormErrorMessage>{formik.errors?.energy_consumption}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl id="timestamp" mb="4">
            <FormLabel>Timestamp</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.timestamp ? new Date(formik.values?.timestamp) : null}
                onChange={(value: Date) => formik.setFieldValue('timestamp', value)}
              />
              <Box zIndex={2}>
                <FiEdit3 />
              </Box>
            </Box>
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'energy_usage',
  operation: AccessOperationEnum.CREATE,
})(EnergyUsageCreatePage);
