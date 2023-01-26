import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Datetime from 'react-datetime';
import { useState } from 'react';
import 'react-datetime/css/react-datetime.css';
import { RiCalendar2Line } from 'react-icons/ri';
import { FiChevronDown } from 'react-icons/fi';
import getDate from 'utils/getDate';
import scss from './ModalAddTransactionForm.module.scss';
import ModalAddTransactionFormMenu from './ModalAddTransactionFormMenu/ModalAddTransactionFormMenu';

const schema = yup.object().shape({
  sum: yup.number().min(0.01).max(2500000).required(),
});
const initialValues = {
  sum: '',
  // Comment: '',
};
const initialValuesTwo = {
  category: '',
  sum: '',
  // Comment: '',
};

const ModalAddTransactionForm = prop => {
  const { checkboxStatus } = prop;
  const [date, setDate] = useState(getDate());
  const [open, setOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState('');

  const createDate = date => {
    setDate(getDate(date));
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const addValueCategory = e => {
    console.log(e.currentTarget.textContent);
    setCategoryValue(e.currentTarget.textContent);
  };

  const handleSubmit = (values, { resetForm }) => {
    const { category, sum } = values;
    console.log(category);
    if (checkboxStatus) {
      const formValues = { ...values, date };
      console.log(formValues);
      setCategoryValue('');
      setDate(getDate());
      return resetForm();
    }
    const formValues = { category: categoryValue, ...values, date };
    console.log(formValues);
    setCategoryValue('');
    setDate(getDate());
    return resetForm();
  };

  const renderCalendarInput = (props, openCalendar) => {
    return (
      <div className={scss.dataBox}>
        <Field
          {...props}
          className={scss.addFormInputDate}
          type="text"
          placeholder="date"
          name="date"
          autoComplete="off"
          readOnly
        ></Field>
        <button className={scss.dataBtn} type="button" onClick={openCalendar}>
          <RiCalendar2Line className={scss.dataBtnIcon}></RiCalendar2Line>
        </button>
      </div>
    );
  };

  return (
    <Formik
      initialValues={!checkboxStatus ? initialValues : initialValuesTwo}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form className={scss.addForm}>
        <div className={scss.addFormInputContainer}>
          {!checkboxStatus && (
            <label className={scss.categoryLabel}>
              <Field
                className={scss.addFormInputCategory}
                type="text"
                placeholder="Select a category"
                name="category"
                value={categoryValue}
                onClick={handleOpen}
                autoComplete="off"
                readOnly
              ></Field>
              <button
                className={scss.openMenuBtn}
                type="button"
                onClick={handleOpen}
              >
                <FiChevronDown className={scss.openMenuBtnIcon}></FiChevronDown>
              </button>
              {open && (
                <ModalAddTransactionFormMenu
                  onClick={addValueCategory}
                ></ModalAddTransactionFormMenu>
              )}
            </label>
          )}
          <label className={scss.sumBox}>
            <Field
              className={scss.addFormInputSum}
              type="text"
              placeholder="0.00"
              name="sum"
            ></Field>
            <ErrorMessage
              className={scss.errorMessage}
              name="sum"
              component="div"
            ></ErrorMessage>
          </label>
          <label>
            <Datetime
              timeFormat={false}
              renderInput={renderCalendarInput}
              dateFormat="DD.MM.YYYY"
              closeOnSelect={true}
              initialValue={new Date()}
              onChange={createDate}
            />
          </label>
          <label>
            <Field
              className={scss.addFormTextarea}
              name="Comment"
              component="textarea"
              placeholder="Comment"
            ></Field>
          </label>
        </div>

        <button type="submit" className={scss.addBtn}>
          Add
        </button>
      </Form>
    </Formik>
  );
};

export default ModalAddTransactionForm;
