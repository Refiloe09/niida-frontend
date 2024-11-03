import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FormLayout from '../layouts/FormLayout';

const FuneralUndertakerForm = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const initialValues = {
    businessName: '',
    dhaDesignationNumber: '',
    companyRegistrationNumber: '',
    sarsRegistrationNumber: '',
    identityNumber: '',
    surname: '',
    forenames: '',
    businessStreet: '',
    businessTown: '',
    businessProvince: '',
    postalCode: '',
    telephoneNumber: '',
    cellNumber: '',
    dateOfCollection: '',
    dateOfCremation: '',
    burialPlace: '',
    burialProvince: '',
    dateOfBurial: '',
    graveNumber: '',
    collectedIdNumber: '',
    collectedSurname: '',
    collectedForenames: '',
    picture: null,
  };

  const validationSchema = Yup.object({
    businessName: Yup.string().required('Business Name is required'),
    dhaDesignationNumber: Yup.string().required('DHA Designation Number is required'),
    companyRegistrationNumber: Yup.string().required('Company Registration Number is required'),
    sarsRegistrationNumber: Yup.string().required('SARS Registration Number is required'),
    identityNumber: Yup.string().required('Identity Number is required'),
    surname: Yup.string().required('Surname is required'),
    forenames: Yup.string().required('Forenames are required'),
    businessStreet: Yup.string().required('Street is required'),
    businessTown: Yup.string().required('Town/City is required'),
    businessProvince: Yup.string().required('Province is required'),
    postalCode: Yup.string().required('Postal Code is required'),
    telephoneNumber: Yup.string().matches(/^[0-9\-\+\s]+$/, 'Telephone number is invalid').nullable(),
    cellNumber: Yup.string().matches(/^[0-9\-\+\s]+$/, 'Cellphone number is invalid').nullable(),
    dateOfCollection: Yup.date().required('Date of Collection of Corpse is required'),
    dateOfCremation: Yup.string().nullable(),  // Assuming this can be nullable as per screenshot
    burialPlace: Yup.string().required('Burial place is required'),
    burialProvince: Yup.string().required('Burial province is required'),
    dateOfBurial: Yup.date().required('Date of Burial is required'),
    graveNumber: Yup.string().nullable(),
    collectedIdNumber: Yup.string().required('ID Number of person who collected the deceased is required'),
    collectedSurname: Yup.string().required('Surname of person who collected the deceased is required'),
    collectedForenames: Yup.string().required('Forenames of person who collected the deceased are required'),
    picture: Yup.mixed().required('A picture is required'),
  });

  const handleSubmit = (values) => {
    console.log('Funeral Undertaker Form submitted:', values);
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
        <h1 className="text-3xl font-bold text-primary-blue mb-6">Funeral Undertaker Form</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
              
              {/* Business Details */}
              <h2 className="text-2xl font-semibold text-primary-blue mb-4">Business Details</h2>
              <div className="mb-6">
                <label>Business Name:</label>
                <Field name="businessName" className="w-full p-2 border rounded mt-2" />
                <ErrorMessage name="businessName" component="div" className="text-red-600 text-sm" />

                <label className="mt-4">DHA Designation Number:</label>
                <Field name="dhaDesignationNumber" className="w-full p-2 border rounded mt-2" />
                <ErrorMessage name="dhaDesignationNumber" component="div" className="text-red-600 text-sm" />

                <label className="mt-4">Company Registration No.:</label>
                <Field name="companyRegistrationNumber" className="w-full p-2 border rounded mt-2" />
                <ErrorMessage name="companyRegistrationNumber" component="div" className="text-red-600 text-sm" />

                <label className="mt-4">SARS Registration No.:</label>
                <Field name="sarsRegistrationNumber" className="w-full p-2 border rounded mt-2" />
                <ErrorMessage name="sarsRegistrationNumber" component="div" className="text-red-600 text-sm" />
              </div>

              {/* Funeral Undertaker Details */}
              <h2 className="text-2xl font-semibold text-primary-blue mb-4">Undertaker Details</h2>
              <div className="mb-6">
                <label>Identity Number:</label>
                <Field name="identityNumber" className="w-full p-2 border rounded mt-2" />
                <ErrorMessage name="identityNumber" component="div" className="text-red-600 text-sm" />

                <label className="mt-4">Surname:</label>
                <Field name="surname" className="w-full p-2 border rounded mt-2" />
                <ErrorMessage name="surname" component="div" className="text-red-600 text-sm" />

                <label className="mt-4">Forenames:</label>
                <Field name="forenames" className="w-full p-2 border rounded mt-2" />
                <ErrorMessage name="forenames" component="div" className="text-red-600 text-sm" />
              </div>

              {/* Business Address */}
              <h2 className="text-2xl font-semibold text-primary-blue mb-4">Business Address</h2>
              <div className="mb-6">
                <label>Street:</label>
                <Field name="businessStreet" className="w-full p-2 border rounded mt-2" />
                <ErrorMessage name="businessStreet" component="div" className="text-red-600 text-sm" />

                <label className="mt-4">Town/City:</label>
                <Field name="businessTown" className="w-full p-2 border rounded mt-2" />
                <ErrorMessage name="businessTown" component="div" className="text-red-600 text-sm" />

                <label className="mt-4">Province:</label>
                <Field name="businessProvince" className="w-full p-2 border rounded mt-2" />
                <ErrorMessage name="businessProvince" component="div" className="text-red-600 text-sm" />

                <label className="mt-4">Postal Code:</label>
                <Field name="postalCode" className="w-full p-2 border rounded mt-2" />
                <ErrorMessage name="postalCode" component="div" className="text-red-600 text-sm" />
              </div>

              {/* Contact Information */}
              <h2 className="text-2xl font-semibold text-primary-blue mb-4">Contact Information</h2>
              <div className="mb-6">
                <label>Telephone No.:</label>
                <Field name="telephoneNumber" className="w-full p-2 border rounded mt-2" />
                <ErrorMessage name="telephoneNumber" component="div" className="text-red-600 text-sm" />

                <label className="mt-4">Cell No.:</label>
                <Field name="cellNumber" className="w-full p-2 border rounded mt-2" />
                <ErrorMessage name="cellNumber" component="div" className="text-red-600 text-sm" />
              </div>

              {/* Collection and Burial Details */}
              <h2 className="text-2xl font-semibold text-primary-blue mb-4">Collection and Burial Information</h2>
              <div className="mb-6">
                <label>Date of Collection of Corpse:</label>
                <Field type="date" name="dateOfCollection" className="w-full p-2 border rounded mt-2" />
                <ErrorMessage name="dateOfCollection" component="div" className="text-red-600 text-sm" />

                <label className="mt-4">Date of Cremation (if applicable):</label>
                <Field name="dateOfCremation" className="w-full p-2 border rounded mt-2" />
                <ErrorMessage name="dateOfCremation" component="div" className="text-red-600 text-sm" />

                <label className="mt-4">Burial place (City/Town/Village):</label>
                <Field name="burialPlace" className="w-full p-2 border rounded mt-2" />
                <ErrorMessage name="burialPlace" component="div" className="text-red-600 text-sm" />

                <label className="mt-4">Province:</label>
                <Field name="burialProvince" className="w-full p-2 border rounded mt-2" />
                <ErrorMessage name="burialProvince" component="div" className="text-red-600 text-sm" />

                <label className="mt-4">Date of Burial:</label>
                <Field type="date" name="dateOfBurial" className="w-full p-2 border rounded mt-2" />
                <ErrorMessage name="dateOfBurial" component="div" className="text-red-600 text-sm" />

                <label className="mt-4">Grave Number (if available):</label>
                <Field name="graveNumber" className="w-full p-2 border rounded mt-2" />
                <ErrorMessage name="graveNumber" component="div" className="text-red-600 text-sm" />
              </div>

              {/* Collection Agent */}
              <h2 className="text-2xl font-semibold text-primary-blue mb-4">Person who Collected the Deceased</h2>
              <div className="mb-6">
                <label>ID Number:</label>
                <Field name="collectedIdNumber" className="w-full p-2 border rounded mt-2" />
                <ErrorMessage name="collectedIdNumber" component="div" className="text-red-600 text-sm" />

                <label className="mt-4">Surname:</label>
                <Field name="collectedSurname" className="w-full p-2 border rounded mt-2" />
                <ErrorMessage name="collectedSurname" component="div" className="text-red-600 text-sm" />

                <label className="mt-4">Forenames:</label>
                <Field name="collectedForenames" className="w-full p-2 border rounded mt-2" />
                <ErrorMessage name="collectedForenames" component="div" className="text-red-600 text-sm" />
              </div>

              {/* Picture Upload */}
              <div className="mb-6">
                <label>Photo:</label>
                <input type="file" accept="image/*" onChange={(event) => handleImageChange(event, setFieldValue)} className="w-full mt-2 p-2 border rounded" />
                {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 w-32 h-32 object-cover" />}
                <ErrorMessage name="picture" component="div" className="text-red-600 text-sm" />
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

export default FuneralUndertakerForm;
