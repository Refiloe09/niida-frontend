import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FormLayout from '../layouts/FormLayout';

const InformantForm = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const initialValues = {
    idNumber: '',
    dateOfBirth: '',
    citizenship: '',
    surname: '',
    forenames: '',
    addressStreet: '',
    addressTown: '',
    addressProvince: '',
    postalCode: '',
    telephoneNumber: '',
    cellphoneNumber: '',
    picture: null,
  };

  const validationSchema = Yup.object({
    idNumber: Yup.string().required('ID Number/Passport is required'),
    dateOfBirth: Yup.date().required('Date of Birth is required'),
    citizenship: Yup.string().required('Citizenship is required'),
    surname: Yup.string().required('Surname is required'),
    forenames: Yup.string().required('Forenames are required'),
    addressStreet: Yup.string().required('Street is required'),
    addressTown: Yup.string().required('Town/City is required'),
    addressProvince: Yup.string().required('Province is required'),
    postalCode: Yup.string().required('Postal Code is required'),
    telephoneNumber: Yup.string().matches(/^[0-9\-\+\s]+$/, 'Telephone number is invalid').nullable(),
    cellphoneNumber: Yup.string().matches(/^[0-9\-\+\s]+$/, 'Cellphone number is invalid').nullable(),
    picture: Yup.mixed().required('A picture is required'),
  });

  const handleSubmit = (values) => {
    console.log('Form data submitted:', values);
  };

  const handleImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setFieldValue("picture", file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <FormLayout>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-primary-blue mb-6">Informant Form</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
              
              <div className="mb-6">
                <label>ID Number/Passport (Passport No. if Foreigner):</label>
                <Field name="idNumber" className="w-full p-2 border rounded mt-2" />
                <ErrorMessage name="idNumber" component="div" className="text-red-600 text-sm" />
              </div>

              <div className="mb-6">
                <label>Date of Birth:</label>
                <Field type="date" name="dateOfBirth" className="w-full p-2 border rounded mt-2" />
                <ErrorMessage name="dateOfBirth" component="div" className="text-red-600 text-sm" />
              </div>

              <div className="mb-6">
                <label>Citizenship:</label>
                <Field name="citizenship" className="w-full p-2 border rounded mt-2" />
                <ErrorMessage name="citizenship" component="div" className="text-red-600 text-sm" />
              </div>

              <div className="mb-6">
                <label>Surname:</label>
                <Field name="surname" className="w-full p-2 border rounded mt-2" />
                <ErrorMessage name="surname" component="div" className="text-red-600 text-sm" />
              </div>

              <div className="mb-6">
                <label>Forenames:</label>
                <Field name="forenames" className="w-full p-2 border rounded mt-2" />
                <ErrorMessage name="forenames" component="div" className="text-red-600 text-sm" />
              </div>

              <div className="mb-6">
                <label>Usual Address:</label>
                <div className="mt-2">
                  <label>Street:</label>
                  <Field name="addressStreet" className="w-full p-2 border rounded mt-2" />
                  <ErrorMessage name="addressStreet" component="div" className="text-red-600 text-sm" />

                  <label className="mt-4">Town/City:</label>
                  <Field name="addressTown" className="w-full p-2 border rounded mt-2" />
                  <ErrorMessage name="addressTown" component="div" className="text-red-600 text-sm" />

                  <label className="mt-4">Province:</label>
                  <Field name="addressProvince" className="w-full p-2 border rounded mt-2" />
                  <ErrorMessage name="addressProvince" component="div" className="text-red-600 text-sm" />

                  <label className="mt-4">Postal Code:</label>
                  <Field name="postalCode" className="w-full p-2 border rounded mt-2" />
                  <ErrorMessage name="postalCode" component="div" className="text-red-600 text-sm" />
                </div>
              </div>

              <div className="mb-6">
                <label>Telephone Number:</label>
                <Field name="telephoneNumber" className="w-full p-2 border rounded mt-2" />
                <ErrorMessage name="telephoneNumber" component="div" className="text-red-600 text-sm" />
              </div>

              <div className="mb-6">
                <label>Cellphone No.:</label>
                <Field name="cellphoneNumber" className="w-full p-2 border rounded mt-2" />
                <ErrorMessage name="cellphoneNumber" component="div" className="text-red-600 text-sm" />
              </div>

              {/* Picture Upload */}
              <div className="mb-6">
                <label>Photo:</label>
                <input type="file" accept="image/*" onChange={(event) => handleImageChange(event, setFieldValue)} className="w-full mt-2 p-2 border rounded" />
                {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 w-32 h-32 object-cover" />}
                <ErrorMessage name="picture" component="div" className="text-red-600 text-sm" />
              </div>

              {/* Disclaimer */}
              <div className="mt-6 text-sm text-gray-600">
                <p>
                  I, the undersigned, hereby certify that the identity of the deceased mentioned
                  in the Deceased Tab is to the best of my knowledge and belief true and correct and case this is not
                  true, I shall be guilty of an offence and on conviction liable to a fine or to imprisonment for a period
                  not exceeding five years or to both such fine and imprisonment (Section 31)(1)(b) of the Act 51 of 1992.
                </p>
              </div>

              {/* Submit Button */}
              <button type="submit" className="w-full py-2 mt-4 bg-primary-blue text-white font-semibold rounded">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </FormLayout>
  );
};

export default InformantForm;
