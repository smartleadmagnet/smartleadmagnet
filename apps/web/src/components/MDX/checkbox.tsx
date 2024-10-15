const Checkbox = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  const { checked } = props;

  return (
    <input className="checkbox pointer-events-none m-0 mr-2 align-middle" defaultChecked={checked} type="checkbox" />
  );
};

export default Checkbox;
