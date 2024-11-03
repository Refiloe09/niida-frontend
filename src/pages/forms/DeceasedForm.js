import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FormLayout from '../layouts/FormLayout';

const DeceasedForm = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const initialValues = {
    deathType: '',
    dateOfDeath: '',
    placeOfDeath: '',
    provinceOfDeath: '',
    registrationPlace: '',
    
    identification: {
      idDocument: false,
      stillBornChild: false,
      featuresMatchDocuments: false,
      wordOfMouth: false,
      unidentifiable: false,
      unidentifiableReason: '',  
      dnaSampleRetrieved: false,
    },
  
    stillBirthInfo: {
      occurredWithin24Hours: false, // No nullable here for boolean
      hoursAfterBirth: '', // Keeping as a string if it's initialized as such
    },
  
    contactInfo: {
      cellphone: '',  
      idPassportNumber: '',
      dateOfBirth: '', // Keeping as a string
    },
  
    personalInfo: {
      fullName: '',
      surname: '',
      maidenName: '',  
      gender: '',
      citizenship: '',
      countryOfBirth: '',
      placeOfBirth: '',
      provinceOfBirth: '',
      address: {
        street: '',
        town: '',
        province: '',
        postalCode: '',  
      },
      maritalStatus: {
        status: '',
        marriageType: '', // Nullable if not always required
      },
    },
  
    picture: '', // String type rather than mixed for stability
  };
  
  const validationSchema = Yup.object({
    deathType: Yup.string().required('Death Type is required'),
    dateOfDeath: Yup.date().required('Date of Death is required'),
    placeOfDeath: Yup.string().required('Place of Death is required'),
    provinceOfDeath: Yup.string().required('Province of Death is required'),
    registrationPlace: Yup.string().required('Place of Registration is required'),
  
    identification: Yup.object().shape({
      idDocument: Yup.boolean(),
      stillBornChild: Yup.boolean(),
      featuresMatchDocuments: Yup.boolean(),
      wordOfMouth: Yup.boolean(),
      unidentifiable: Yup.boolean(),
      unidentifiableReason: Yup.string().nullable(),
      dnaSampleRetrieved: Yup.boolean(),
    }),
  
    stillBirthInfo: Yup.object().shape({
      occurredWithin24Hours: Yup.boolean(),
      hoursAfterBirth: Yup.string().nullable(), // Keep string type consistent with initialValues
    }),
  
    contactInfo: Yup.object().shape({
      cellphone: Yup.string().nullable(),
      idPassportNumber: Yup.string().nullable(),
      dateOfBirth: Yup.date().nullable(),
    }),
  
    personalInfo: Yup.object().shape({
      fullName: Yup.string().required('Full Name is required'),
      surname: Yup.string().required('Surname is required'),
      maidenName: Yup.string().nullable(),
      gender: Yup.string().required('Gender is required'),
      citizenship: Yup.string().required('Citizenship is required'),
      address: Yup.object().shape({
        street: Yup.string().required('Street is required'),
        town: Yup.string().required('Town/City is required'),
        province: Yup.string().required('Province is required'),
        postalCode: Yup.string().nullable(),
      }),
      countryOfBirth: Yup.string().required('Country of Birth is required'),
      placeOfBirth: Yup.string().required('Place of Birth is required'),
      provinceOfBirth: Yup.string().required('Province of Birth is required'),
      maritalStatus: Yup.object().shape({
        status: Yup.string().required('Marital Status is required'),
        marriageType: Yup.string().nullable(), // Nullable if not always required
      }),
    }),
  
    picture: Yup.string().nullable(), // Ensure this is consistently treated as a string
  });
  
  
  
  

  const handleSubmit = (values) => {
    console.log('called handleSubmit');
    const preparedData = {
      ...values,
      dateSubmitted: new Date().toISOString(),
      submissionId: `submission_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    };
    console.log('Form Data as JSON:', JSON.stringify(preparedData, null, 2));
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
    <h1 className="text-3xl font-bold text-primary-blue mb-6">Deceased Form</h1>
    <p className="text-gray-700 mb-8 text-center">
      Please fill in the details carefully. This information will be used to generate a PDF for record purposes.
    </p>

    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} validateOnBlur={false}>
      {({ setFieldValue, errors }) => { 
        console.log('Formik validation errors:', errors);
        return (
        <Form className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">

          {/* Full Name and Surname */}
          <div className="mb-6">
            <label>Full Name:</label>
            <Field name="personalInfo.fullName" className="w-full p-2 border rounded mt-2" />
            <ErrorMessage name="personalInfo.fullName" component="div" className="text-red-600 text-sm" />
            
            <label>Surname:</label>
            <Field name="personalInfo.surname" className="w-full p-2 border rounded mt-2" />
            <ErrorMessage name="personalInfo.surname" component="div" className="text-red-600 text-sm" />

            <label>Maiden Name (if applicable):</label>
            <Field name="personalInfo.maidenName" className="w-full p-2 border rounded mt-2" />
          </div>

          {/* Date of Death */}
          <div className="mb-6">
            <label>Date of Death:</label>
            <Field type="date" name="dateOfDeath" className="w-full p-2 border rounded mt-2" />
          </div>

          {/* Death Type */}
          <div className="mb-6">
            <label>Death Type:</label>
            <Field as="select" name="deathType" className="w-full p-2 border rounded mt-2">
              <option value="">Select</option>
              <option value="death">Death</option>
              <option value="stillBirth">Still Birth</option>
            </Field>
          </div>

          {/* If Still Born */}
          <div className="mb-6">
            <label>If Still Born, did death occur within 24 hours?</label>
            <Field as="select" name="stillBirthInfo.occurredWithin24Hours" className="w-full p-2 border rounded mt-2">
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Field>
            <div className="mt-2">
              <label>Hours:</label>
              <Field type="number" name="stillBirthInfo.hoursAfterBirth" className="w-full p-2 border rounded mt-2" placeholder="Specify hours if within 24" />
            </div>
          </div>

          {/* Identification of Deceased */}
          <div className="mb-6">
            <label>Identification Options (select all that apply):</label>
            <div className="flex flex-col space-y-2">
              <label><Field type="checkbox" name="identification.idDocument" /> ID Document/Passport</label>
              <label><Field type="checkbox" name="identification.stillBornChild" /> Still Born Child</label>
              <label><Field type="checkbox" name="identification.featuresMatchDocuments" /> Features Match</label>
              <label><Field type="checkbox" name="identification.wordOfMouth" /> Word of Mouth</label>
              <label><Field type="checkbox" name="identification.unidentifiable" /> Unidentifiable</label>
              <div className="ml-6">
                <label><Field type="radio" name="identification.unidentifiableReason" value="burnt" /> Burnt</label>
                <label><Field type="radio" name="identification.unidentifiableReason" value="decomposed" /> Decomposed</label>
                <label><Field type="radio" name="identification.unidentifiableReason" value="other" /> Other: 
                  <Field name="identification.unidentifiableReasonOther" placeholder="Specify" className="p-1 border rounded" />
                </label>
              </div>
              <label><Field type="checkbox" name="identification.dnaSampleRetrieved" /> DNA Sample Retrieved</label>
            </div>
          </div>

          {/* Province of Death */}
          <div className="mb-6">
            <label>Province of Death:</label>
            <Field as="select" name="provinceOfDeath" className="w-full p-2 border rounded mt-2">
              <option value="">Select Province</option>
              <option value="Gauteng">Gauteng</option>
              <option value="KwaZulu-Natal">KwaZulu-Natal</option>
              {/* Other provinces here */}
            </Field>
          </div>

          {/* Place of Registration */}
          <div className="mb-6">
            <label>Place of Registration of Death:</label>
            <Field name="registrationPlace" className="w-full p-2 border rounded mt-2" />
          </div>

          {/* Cellphone Number */}
          <div className="mb-6">
            <label>Cellphone Number (if applicable):</label>
            <Field name="contactInfo.cellphone" className="w-full p-2 border rounded mt-2" />
          </div>

          {/* ID/Passport Number or DOB */}
          <div className="mb-6">
            <label>ID/Passport Number:</label>
            <Field name="contactInfo.idPassportNumber" className="w-full p-2 border rounded mt-2" />
            <label>Date of Birth (if no ID/Passport):</label>
            <Field type="date" name="contactInfo.dateOfBirth" className="w-full p-2 border rounded mt-2" />
          </div>

          {/* Gender */}
          <div className="mb-6">
            <label>Gender:</label>
            <Field as="select" name="personalInfo.gender" className="w-full p-2 border rounded mt-2">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="indeterminable">Indeterminable</option>
            </Field>
          </div>

          {/* Usual Address */}
          <div className="mb-6">
            <label>Usual Address (Physical):</label>
            <Field name="personalInfo.address.street" className="w-full p-2 border rounded mt-2" />
          </div>

          {/* Citizenship */}
          <div className="mb-6">
            <label>Citizenship:</label>
            <Field as="select" name="personalInfo.citizenship" className="w-full p-2 border rounded mt-2">
              <option value="">Select Citizenship</option>
              <option value="South African">South African</option>
              <option value="Permanent Resident">Permanent Resident</option>
              {/* Other options */}
            </Field>
          </div>

          {/* Place of Birth, Country, and Province/State */}
          <div className="mb-6">
            <label>Place of Birth (City, Town, Village):</label>
            <Field name="personalInfo.placeOfBirth" className="w-full p-2 border rounded mt-2" />
            <label>Country of Birth:</label>
            <Field name="personalInfo.countryOfBirth" className="w-full p-2 border rounded mt-2" />
            <label>Province/State of Birth:</label>
            <Field name="personalInfo.provinceOfBirth" className="w-full p-2 border rounded mt-2" />
          </div>

          {/* Marital Status and Marriage Type */}
          <div className="mb-6">
            <label>Marital Status:</label>
            <Field as="select" name="personalInfo.maritalStatus.status" className="w-full p-2 border rounded mt-2">
              <option value="">Select Marital Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="widowed">Widowed</option>
              <option value="divorced">Divorced</option>
            </Field>
            <div className="mt-2">
              <label>Marriage Type (if married):</label>
              <Field as="select" name="personalInfo.maritalStatus.marriageType" className="w-full p-2 border rounded mt-2">
                <option value="">Select Marriage Type</option>
                <option value="customary">Customary</option>
                <option value="religious">Religious</option>
                <option value="civil">Civil</option>
                <option value="civilUnion">Civil Union</option>
              </Field>
            </div>
          </div>

          {/* Picture Upload */}
          <div className="mb-6">
            <label>Upload Picture:</label>
            <input type="file" accept="image/*" onChange={(event) => handleImageChange(event, setFieldValue)} className="w-full mt-2 p-2 border rounded" />
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full py-2 mt-4 bg-primary-blue text-white font-semibold rounded">
            Submit
          </button>

        </Form>
      );}}
    </Formik>
  </div>
</FormLayout>

  );
};

export default DeceasedForm;
