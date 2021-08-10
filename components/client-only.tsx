import { useEffect, useState } from "react";

/** ClientOnly
 * 
 * @param children - Ignore these as they will not be passed or changed.
 * @param delegated - Ignore these as they will not be passed or changed.
 * @returns Only returns component if is Client Side.
 */
const ClientOnly = ({ children, ...delegated }: any) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
}

export default ClientOnly