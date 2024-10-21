const Checkbox = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  const { checked } = props;

  return <input {...props} className="checkbox m-0 mr-2 align-middle" defaultChecked={checked} type="checkbox" />;
};

export default Checkbox;
