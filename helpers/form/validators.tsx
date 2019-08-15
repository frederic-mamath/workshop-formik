type CreateTaskErrors = {
  what?: boolean;
  why?: boolean;
  when?: boolean;
  how?: boolean;
};

type CreateTaskValues = {
  what: string;
  why: string;
  when: string;
  how: string;
};

export const validateCreateTask = (
  values: CreateTaskValues
): CreateTaskErrors => {
  const errors: CreateTaskErrors = {};

  if (!values.what) errors.what = true;
  if (!values.why) errors.why = true;
  if (!values.when) errors.when = true;
  if (!values.how) errors.how = true;

  return errors;
};
