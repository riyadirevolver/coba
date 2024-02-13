import React from "react";
import useFetchClient from "../../../hooks/fetch/useFetchClient";
import { Autocomplete, CircularProgress } from "@mui/material";
import CustomFormLabel from "../custom-elements/CustomFormLabel";
import CustomTextField from "../custom-elements/CustomTextField";
import useFetchClientRequest from "../../../hooks/fetch/useFetchClientRequest";

const ClientDropdown = ({ token, session, handleChange, idx }) => {
  const [project, setProject] = React.useState(null);
  const [client, setClient] = React.useState(null);

  const { clientList, openClient, setOpenClient, loadingClient } =
    useFetchClient(token);

  const {
    clientRequestList,
    openClientRequest,
    setOpenClientRequest,
    loadingClientRequest,
    setClientRequestList,
  } = useFetchClientRequest(token, session?.client_id || client, session?.role);

  const optionLabel = (option) => {
    if (typeof option === "string") {
      return option;
    }
    if (option.inputValue) {
      return option.inputValue;
    }
    return option.position;
  };
  return (
    <>
      {!session?.client_id && <React.Fragment></React.Fragment>}
      <CustomFormLabel htmlFor="input-placement">Client</CustomFormLabel>
      <Autocomplete
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        options={clientList}
        getOptionLabel={(option) => option.name}
        loading={loadingClient}
        open={openClient}
        onOpen={() => {
          setOpenClient(true);
        }}
        onClose={() => {
          setOpenClient(false);
        }}
        onChange={(e, newInputValue) => {
          handleChange(idx, "client_id", newInputValue?.id);
          setClientRequestList([]);
          setClient(newInputValue?.id);
          setProject(null);
        }}
        renderInput={(params) => (
          <CustomTextField
            {...params}
            required
            size="small"
            placeholder="Pilih Nama Klien"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loadingClient ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      <CustomFormLabel htmlFor="input-placement">Project</CustomFormLabel>
      <Autocomplete
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        options={clientRequestList}
        getOptionLabel={optionLabel}
        loading={loadingClientRequest}
        open={openClientRequest}
        onOpen={() => {
          setOpenClientRequest(true);
        }}
        onClose={() => {
          setOpenClientRequest(false);
        }}
        onChange={(e, newInputValue) => {
          handleChange(idx, "client_request_id", newInputValue?.id);
          setProject((prevState) => ({
            ...prevState,
            id: newInputValue?.id,
            position: newInputValue?.position,
          }));
        }}
        value={project || null}
        onInputChange={() => {
          setProject(null);
        }}
        renderInput={(params) => (
          <CustomTextField
            {...params}
            required
            size="small"
            placeholder="Pilih Project"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loadingClientRequest ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </>
  );
};

export default ClientDropdown;
