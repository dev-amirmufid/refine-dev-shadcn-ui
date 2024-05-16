import { DeleteActionModal } from "@/components/refine-ui/data-table/actions/delete";
import { BaseKey } from "@refinedev/core";
import React, { type PropsWithChildren, createContext, useState } from "react";

type DeleteDataType = {
  toogle: boolean;
  recordItemId?: BaseKey;
  resource?: string;
};

export interface DeleteContextType {
  data: DeleteDataType;
  updateData: (data: DeleteDataType) => void;
}

const DeleteContext = createContext<DeleteContextType | undefined>(undefined);

const DeleteProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<DeleteDataType>({
    recordItemId: undefined,
    toogle: false,
    resource: undefined,
  });

  const updateData = (data: DeleteDataType) => {
    setData(data);
  };

  return (
    <DeleteContext.Provider value={{ data, updateData }}>
      {children}
      <DeleteActionModal
        data={data as DeleteDataType}
        updateData={updateData}
      />
    </DeleteContext.Provider>
  );
};

export { DeleteContext, DeleteProvider };
