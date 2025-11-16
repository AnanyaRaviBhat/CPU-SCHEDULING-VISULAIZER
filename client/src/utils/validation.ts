export const validateNumber = (value: string): number | null => {
  const num = parseFloat(value);
  if (isNaN(num) || num < 0) return null;
  return num;
};

export const validatePositiveNumber = (value: string): number | null => {
  const num = parseFloat(value);
  if (isNaN(num) || num <= 0) return null;
  return num;
};

export const validateProcessId = (pid: string): boolean => {
  return pid.trim().length > 0;
};
