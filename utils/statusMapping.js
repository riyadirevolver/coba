export const statusMapping = (data) => {
  if (data.upliner3_id) {
    return data.is_approved_client3;
  }
  if (data.upliner2_id) {
    return data.is_approved_client;
  }
  if (data.upliner_id) {
    return data.is_approved;
  }
  return null;
};

export const statusMappingCorrection = (data) => {
  if (data.upliner3_id) {
    return data.is_approved_client3;
  }
  if (data.upliner2_id) {
    return data.is_approved_client;
  }
  if (data.upliner_id) {
    return data.is_approve;
  }
  return null;
};
