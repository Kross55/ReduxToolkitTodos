import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addTodo } from "./todoSlice.js";

const TodoForm = () => {
  const dispatch = useDispatch();

  const initialValues = React.useRef({
    text: '',
  });

  const validationSchema = React.useRef(Yup.object({
    text: Yup.string().required('Please enter a todo.'),
  }));

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addTodo(values.text));
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues.current}
      validationSchema={validationSchema.current}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className="form">
          <Field type="text" name="text" placeholder="Enter todo" />
          <button className="form-buttons" type="submit">
            Add Todo
          </button>
        </div>
        <ErrorMessage name="text" component="div" className="error" />
      </Form>
    </Formik>
  );
};

export default TodoForm;
