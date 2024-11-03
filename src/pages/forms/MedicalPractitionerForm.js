import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FormLayout from '../layouts/FormLayout';

const MedicalPractitionerForm = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const initialValues = {
    certification: '',  // Red or Green button for certification
    surname: '',
    forenames: '',
    hpcsaRegNo: '',
    healthFacility: '',
    practiceNumber: '',
    businessAddress: {
      street: '',
      townCity: '',
      province: '',
      postalCode: '',
    },
    cell: '',
    idNumber: '',
    picture: null,
  };

  const validationSchema = Yup.object({
    certification: Yup.string().required('Certification selection is required'),
    surname: Yup.string().required('Surname is required'),
    forenames: Yup.string().required('Forenames are required'),
    hpcsaRegNo: Yup.string().required('HPCSA Reg No. is required'),
    healthFacility: Yup.string().required('Health Facility/Practice Name is required'),
    practiceNumber: Yup.string().required('Facility/Practice No. is required'),
    businessAddress: Yup.object().shape({
      street: Yup.string().required('Street is required'),
      townCity: Yup.string().required('Town/City is required'),
      province: Yup.string().required('Province is required'),
      postalCode: Yup.string().required('Postal Code is required'),
    }),
    cell: Yup.string().required('Cell number is required'),
    idNumber: Yup.string().required('ID Number is required'),
    picture: Yup.mixed().nullable().required('Picture is required'),
  });

  const handleSubmit = (values) => {
    console.log('Form submitted:', values);
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

  const deathCertificateInitialValues = {
    idNumber: '',
    gender: '',
    surname: '',
    forenames: '',
    populationGroup: '',
    placeOfDeath: '',
    otherPlaceOfDeath: '',
    healthFacility: '',
    telephone: '',
    patientFileNo: '',
    contactPersonSurname: '',
    contactPersonForenames: '',
    roleRank: '',
    immediateCause: '',
    sequentialConditions: '',
    underlyingCause: '',
    significantConditions: '',
    pregnancyStatus: '',
    causeOfDeathMethod: [],
    otherCauseOfDeathMethod: '',
  };
  
  const deathCertificateValidationSchema = Yup.object({
    idNumber: Yup.string().required('ID Number/Passport is required'),
    gender: Yup.string().required('Gender is required'),
    surname: Yup.string().required('Surname is required'),
    forenames: Yup.string().required('Forenames are required'),
    populationGroup: Yup.string().required('Population Group is required'),
    placeOfDeath: Yup.string().required('Place of Death is required'),
    otherPlaceOfDeath: Yup.string().when('placeOfDeath', {
      is: 'other',
      then: Yup.string().required('Please specify other place of death'),
    }),
    healthFacility: Yup.string().required('Health Facility/Practice Name is required'),
    telephone: Yup.string().matches(/^[0-9\-\+\s]+$/, 'Telephone number is invalid').nullable(),
    patientFileNo: Yup.string().nullable(),
    contactPersonSurname: Yup.string().nullable(),
    contactPersonForenames: Yup.string().nullable(),
    roleRank: Yup.string().nullable(),
    immediateCause: Yup.string().required('Immediate Cause is required'),
    sequentialConditions: Yup.string().nullable(),
    underlyingCause: Yup.string().required('Underlying Cause is required'),
    significantConditions: Yup.string().nullable(),
    
    // Conditional validation for pregnancyStatus
    pregnancyStatus: Yup.string().when('gender', {
      is: 'female',
      then: Yup.string().required('Pregnancy status is required if the gender is female'),
      otherwise: Yup.string().nullable(),
    }),
  
    causeOfDeathMethod: Yup.array().min(1, 'Select at least one method used to ascertain the cause of death'),
    otherCauseOfDeathMethod: Yup.string().when('causeOfDeathMethod', {
      is: (methods) => methods.includes('other'),
      then: Yup.string().required('Please specify other method used'),
    }),
  });
  
  

  const handleDeathCertificateSubmit = (values) => {
    console.log('Death Certificate Form submitted:', values);
  };

  return (
    <FormLayout>
      <div className="flex flex-col ">
        <h1 className="text-3xl font-bold text-primary-blue mb-6">
          Medical Practitioner Form and Death Certificate Forms
        </h1>
        <div className="flex flex-col md:flex-row justify-center md:space-x-4 w-full max-w-7xl">
          {/* Medical Practitioner Form */}
          <div className="w-full md:w-1/2 p-4 bg-white rounded-lg  mb-8">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue }) => (
                <Form className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
                  <h2 className="text-2xl font-semibold text-primary-blue mb-4">
                    Medical Practitioner Form
                  </h2>
                  {/* Certification Selection */}
                  <div className="mb-6">
                    <label>Certification:</label>
                    <div className="flex items-center space-x-4 mt-2">
                      <label>
                        <Field
                          type="radio"
                          name="certification"
                          value="natural"
                        />
                        Died solely and exclusively from natural causes
                      </label>
                      <label>
                        <Field
                          type="radio"
                          name="certification"
                          value="nonNatural"
                        />
                        Not in the position to certify death as exclusively
                        natural
                      </label>
                    </div>
                    <ErrorMessage
                      name="certification"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  {/* Surname and Forenames */}
                  <div className="mb-6">
                    <label>Surname:</label>
                    <Field
                      name="surname"
                      className="w-full p-2 border rounded mt-2"
                    />
                    <ErrorMessage
                      name="surname"
                      component="div"
                      className="text-red-600 text-sm"
                    />

                    <label>Forenames:</label>
                    <Field
                      name="forenames"
                      className="w-full p-2 border rounded mt-2"
                    />
                    <ErrorMessage
                      name="forenames"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  {/* HPCSA Reg No. */}
                  <div className="mb-6">
                    <label>HPCSA Reg No.:</label>
                    <Field
                      name="hpcsaRegNo"
                      className="w-full p-2 border rounded mt-2"
                    />
                    <ErrorMessage
                      name="hpcsaRegNo"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  {/* Health Facility/Practice Name and Practice Number */}
                  <div className="mb-6">
                    <label>Name of Health Facility/Practice:</label>
                    <Field
                      name="healthFacility"
                      className="w-full p-2 border rounded mt-2"
                    />
                    <ErrorMessage
                      name="healthFacility"
                      component="div"
                      className="text-red-600 text-sm"
                    />

                    <label>Facility/Practice No.:</label>
                    <Field
                      name="practiceNumber"
                      className="w-full p-2 border rounded mt-2"
                    />
                    <ErrorMessage
                      name="practiceNumber"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  {/* Business Address */}
                  <div className="mb-6">
                    <label>Business Address:</label>
                    <div className="mt-2">
                      <label>Street:</label>
                      <Field
                        name="businessAddress.street"
                        className="w-full p-2 border rounded mt-2"
                      />
                      <ErrorMessage
                        name="businessAddress.street"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>
                    <div className="mt-2">
                      <label>Town/City:</label>
                      <Field
                        name="businessAddress.townCity"
                        className="w-full p-2 border rounded mt-2"
                      />
                      <ErrorMessage
                        name="businessAddress.townCity"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>
                    <div className="mt-2">
                      <label>Province:</label>
                      <Field
                        name="businessAddress.province"
                        className="w-full p-2 border rounded mt-2"
                      />
                      <ErrorMessage
                        name="businessAddress.province"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>
                    <div className="mt-2">
                      <label>Postal Code:</label>
                      <Field
                        name="businessAddress.postalCode"
                        className="w-full p-2 border rounded mt-2"
                      />
                      <ErrorMessage
                        name="businessAddress.postalCode"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>
                  </div>

                  {/* Cell and ID Number */}
                  <div className="mb-6">
                    <label>Cell:</label>
                    <Field
                      name="cell"
                      className="w-full p-2 border rounded mt-2"
                    />
                    <ErrorMessage
                      name="cell"
                      component="div"
                      className="text-red-600 text-sm"
                    />

                    <label>ID Number:</label>
                    <Field
                      name="idNumber"
                      className="w-full p-2 border rounded mt-2"
                    />
                    <ErrorMessage
                      name="idNumber"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  {/* Picture Upload */}
                  <div className="mb-6">
                    <label>Upload Picture:</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        handleImageChange(event, setFieldValue)
                      }
                      className="w-full mt-2 p-2 border rounded"
                    />
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mt-4 w-32 h-32"
                      />
                    )}
                    <ErrorMessage
                      name="picture"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  {/* Disclaimer */}
                  <div className="mt-6 text-sm text-gray-600">
                    <p>
                      I, the undersigned, that I examined the body of the
                      deceased named the deceased tab and declare that the, to
                      the best of my knowledge and belief, died of natural or
                      unnatural cause as indicated above and case this is not
                      true, I shall be guilty of an offence and on conviction
                      liable to a fine or to imprisonment for a period not
                      exceeding five years or to both such fine and imprisonment
                      (Section 31)(1)(b) of the Act 51 of 1992.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-2 mt-4 bg-primary-blue text-white font-semibold rounded"
                  >
                    Submit Medical Practitioner
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          {/* Death Certificate Form */}
          <div className="w-full md:w-1/2 p-4 bg-white rounded-lg  mb-8">
            <Formik
              initialValues={deathCertificateInitialValues}
              validationSchema={deathCertificateValidationSchema}
              onSubmit={handleDeathCertificateSubmit}
            >
              {({ setFieldValue, values }) => (
                <Form className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
                  <h2 className="text-2xl font-semibold text-primary-blue  mb-6">
                    Death Certificate Form
                  </h2>
                  {/* ID Number and Gender */}
                  <div className="mb-6">
                    <label>ID Number / Passport (if Foreigner):</label>
                    <Field
                      name="idNumber"
                      className="w-full p-2 border rounded mt-2"
                    />
                    <ErrorMessage
                      name="idNumber"
                      component="div"
                      className="text-red-600 text-sm"
                    />

                    <label>Gender:</label>
                    <div className="flex items-center space-x-4 mt-2">
                      <label>
                        <Field type="radio" name="gender" value="male" /> Male
                      </label>
                      <label>
                        <Field type="radio" name="gender" value="female" />{" "}
                        Female
                      </label>
                      <label>
                        <Field
                          type="radio"
                          name="gender"
                          value="indeterminable"
                        />{" "}
                        Indeterminable
                      </label>
                    </div>
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  {/* Surname and Forenames */}
                  <div className="mb-6">
                    <label>Surname:</label>
                    <Field
                      name="surname"
                      className="w-full p-2 border rounded mt-2"
                    />
                    <ErrorMessage
                      name="surname"
                      component="div"
                      className="text-red-600 text-sm"
                    />

                    <label>Forenames:</label>
                    <Field
                      name="forenames"
                      className="w-full p-2 border rounded mt-2"
                    />
                    <ErrorMessage
                      name="forenames"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  {/* Population Group */}
                  <div className="mb-6">
                    <label>Population Group:</label>
                    <div className="flex items-center space-x-4 mt-2">
                      <label>
                        <Field
                          type="radio"
                          name="populationGroup"
                          value="african"
                        />{" "}
                        African
                      </label>
                      <label>
                        <Field
                          type="radio"
                          name="populationGroup"
                          value="white"
                        />{" "}
                        White
                      </label>
                      <label>
                        <Field
                          type="radio"
                          name="populationGroup"
                          value="indian"
                        />{" "}
                        Indian/Asian
                      </label>
                      <label>
                        <Field
                          type="radio"
                          name="populationGroup"
                          value="coloured"
                        />{" "}
                        Coloured
                      </label>
                      <label>
                        <Field
                          type="radio"
                          name="populationGroup"
                          value="other"
                        />{" "}
                        Other
                      </label>
                    </div>
                    {values.populationGroup === 'other' && (
                      <div className="mt-2">
                        <Field name="otherPopulationGroup" placeholder="Specify other group" className="w-full p-2 border rounded" />
                        <ErrorMessage name="otherPopulationGroup" component="div" className="text-red-600 text-sm" />
                      </div>
                    )}
                    <ErrorMessage
                      name="populationGroup"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  {/* Place of Death */}
                  <div className="mb-6">
                    <label>Place of Death:</label>
                    <div className="flex flex-wrap items-center space-x-4 mt-2">
                      <label><Field type="radio" name="placeOfDeath" value="hospital" /> Hospital/Inpatient</label>
                      <label><Field type="radio" name="placeOfDeath" value="er" /> ER/Outpatient</label>
                      <label><Field type="radio" name="placeOfDeath" value="doa" /> DOA</label>
                      <label><Field type="radio" name="placeOfDeath" value="nursingHome" /> Nursing Home</label>
                      <label><Field type="radio" name="placeOfDeath" value="home" /> At Home</label>
                      <label><Field type="radio" name="placeOfDeath" value="other" /> Other</label>
                    </div>
                    {values.placeOfDeath === 'other' && (
                      <div className="mt-2">
                        <Field name="otherPlaceOfDeath" placeholder="Specify other place" className="w-full p-2 border rounded" />
                        <ErrorMessage name="otherPlaceOfDeath" component="div" className="text-red-600 text-sm" />
                      </div>
                    )}
                    <ErrorMessage name="placeOfDeath" component="div" className="text-red-600 text-sm" />
                  </div>

                  {/* Additional Fields for Facility and Contact Information */}
                  <div className="mb-6">
                    <label>Name of Health Facility/Practice:</label>
                    <Field name="healthFacility" className="w-full p-2 border rounded mt-2" />
                    <ErrorMessage name="healthFacility" component="div" className="text-red-600 text-sm" />

                    <label className="mt-4">Telephone:</label>
                    <Field name="telephone" type="tel" className="w-full p-2 border rounded mt-2" />
                    <ErrorMessage name="telephone" component="div" className="text-red-600 text-sm" />

                    <label className="mt-4">Patient File No.:</label>
                    <Field name="patientFileNo" className="w-full p-2 border rounded mt-2" />
                    <ErrorMessage name="patientFileNo" component="div" className="text-red-600 text-sm" />

                    <label className="mt-4">Contact Person at Facility (Surname):</label>
                    <Field name="contactPersonSurname" className="w-full p-2 border rounded mt-2" />
                    <ErrorMessage name="contactPersonSurname" component="div" className="text-red-600 text-sm" />

                    <label className="mt-4">Forenames:</label>
                    <Field name="contactPersonForenames" className="w-full p-2 border rounded mt-2" />
                    <ErrorMessage name="contactPersonForenames" component="div" className="text-red-600 text-sm" />

                    <label className="mt-4">Pole/Rank:</label>
                    <Field name="roleRank" className="w-full p-2 border rounded mt-2" />
                    <ErrorMessage name="roleRank" component="div" className="text-red-600 text-sm" />
                  </div>

                  {/* Immediate and Underlying Cause of Death */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">For Deaths Occurring After One Week of Birth</h3>

                    <label>Immediate Cause (final Disease or condition resulting in death):</label>
                    <Field as="textarea" name="immediateCause" rows="3" className="w-full p-2 border rounded mt-2" />
                    <ErrorMessage name="immediateCause" component="div" className="text-red-600 text-sm" />

                    <label className="mt-4">Sequentially list conditions, if any, Leading to immediate cause:</label>
                    <Field as="textarea" name="sequentialConditions" rows="3" className="w-full p-2 border rounded mt-2" />
                    <ErrorMessage name="sequentialConditions" component="div" className="text-red-600 text-sm" />

                    <label className="mt-4">Underlying Cause (Disease or injury that initiated events resulting in death):</label>
                    <Field as="textarea" name="underlyingCause" rows="3" className="w-full p-2 border rounded mt-2" />
                    <ErrorMessage name="underlyingCause" component="div" className="text-red-600 text-sm" />

                    <label className="mt-4">Other significant conditions contributing to death but not resulting in underlying cause given in (Underlying Cause):</label>
                    <Field as="textarea" name="significantConditions" rows="3" className="w-full p-2 border rounded mt-2" />
                    <ErrorMessage name="significantConditions" component="div" className="text-red-600 text-sm" />
                  </div>


                  {/* Pregnancy Status */}
                  <div className="mb-6">
                    <label>
                      If female, was she pregnant at death or up to 42 days
                      prior to death?
                    </label>
                    <div className="flex items-center space-x-4 mt-2">
                      <label>
                        <Field
                          type="radio"
                          name="pregnancyStatus"
                          value="yes"
                        />{" "}
                        Yes
                      </label>
                      <label>
                        <Field
                          type="radio"
                          name="pregnancyStatus"
                          value="no"
                        />{" "}
                        No
                      </label>
                    </div>
                    <ErrorMessage
                      name="pregnancyStatus"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  {/* Method to Ascertain Cause of Death */}
                  <div className="mb-6">
                    <label>
                      Method used to ascertain the cause of death:
                    </label>
                    <div className="flex flex-col space-y-2 mt-2">
                      <label>
                        <Field
                          type="checkbox"
                          name="causeOfDeathMethod"
                          value="autopsy"
                        />{" "}
                        Autopsy
                      </label>
                      <label>
                        <Field
                          type="checkbox"
                          name="causeOfDeathMethod"
                          value="opinionPractitioner"
                        />{" "}
                        Opinion of attending Medical Practitioner
                      </label>
                      <label>
                        <Field
                          type="checkbox"
                          name="causeOfDeathMethod"
                          value="opinionNurse"
                        />{" "}
                        Opinion of registered nurse
                      </label>
                      <label>
                        <Field
                          type="checkbox"
                          name="causeOfDeathMethod"
                          value="interviewFamily"
                        />{" "}
                        Interview of family member
                      </label>
                      <label>
                        <Field
                          type="checkbox"
                          name="causeOfDeathMethod"
                          value="other"
                        />{" "}
                        Other (Specify)
                      </label>
                    </div>
                    {values.causeOfDeathMethod.includes("other") && (
                      <div className="mt-2">
                        <Field
                          name="otherCauseOfDeathMethod"
                          placeholder="Specify other method"
                          className="w-full p-2 border rounded"
                        />
                        <ErrorMessage
                          name="otherCauseOfDeathMethod"
                          component="div"
                          className="text-red-600 text-sm"
                        />
                      </div>
                    )}
                    <ErrorMessage
                      name="causeOfDeathMethod"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-2 mt-4 bg-primary-blue text-white font-semibold rounded"
                  >
                    Submit Death Certificate
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          
        </div>
        
      </div>
    </FormLayout>
  );
};

export default MedicalPractitionerForm;
