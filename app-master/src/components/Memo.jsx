import { useState, memo } from "react";

const Cat = ({ name }) => {
  console.log(`rendering ${name}`);
  return <div>{name}</div>;
};

const PureCat = memo(Cat);

/**
 * memo 사용 예제
 * @returns
 */
const Memo = () => {
  const [cats, setCats] = useState(["Biscuit", "Jungle", "Outlaw"]);

  return (
    <div>
      {cats.map((cat, i) => (
        <PureCat key={i} name={cat} />
      ))}
      <button onClick={() => setCats([...cats, "adf"])}>Add a cat</button>
    </div>
  );
};

export default Memo;
