import { useContext, useState, createContext } from "react";
interface Interface {
  currentWebsite?: Website;
  onChangeWebsite: (newId?: Website) => void;
}
export interface Website {
  title: string;
  url: string;
  desc: string;
  creator: string;
  id?: string;
}

const WebsiteContext = createContext<Interface>(undefined!);

export function WebsiteProvider({
  children = null,
}: {
  children: JSX.Element | null;
}) {
  const [currentWebsite, setCurrentWebsite] = useState<Website | undefined>(
    undefined
  );
  const onChangeWebsite = (newWebsite?: Website) => {
    setCurrentWebsite(newWebsite);
  };

  return (
    <WebsiteContext.Provider
      value={{
        currentWebsite,
        onChangeWebsite,
      }}
    >
      {children}
    </WebsiteContext.Provider>
  );
}

export const useWebsiteContext = () => {
  return useContext(WebsiteContext);
};
