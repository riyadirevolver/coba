describe("add multi client submit candidate", () => {
  const payloadData = [
    {
      id: 123,
      client_request_id: 48,
      jc_person_id: 402,
      notes: "Mantap",
      candidate_response: null,
      status: "sent",
      created_by: 1,
      created_at: "2024-02-13T08:09:17.281Z",
      updated_at: "2024-02-13T08:09:17.281Z",
      candidate_sent_id: 123,
    },
    {
      id: 124,
      client_request_id: 51,
      jc_person_id: 402,
      notes: "Mantap",
      candidate_response: null,
      status: "sent",
      created_by: 1,
      created_at: "2024-02-13T08:09:17.281Z",
      updated_at: "2024-02-13T08:09:17.281Z",
      candidate_sent_id: 124,
    },
  ];

  const response = [
    {
      id: 123,
      client_request_id: 48,
      jc_person_id: 402,
      notes: "Mantap",
      candidate_response: null,
      status: "sent",
      created_by: 1,
      created_at: "2024-02-13T08:09:17.281Z",
      updated_at: "2024-02-13T08:09:17.281Z",
      candidate_sent_id: 123,
    },
    {
      id: 124,
      client_request_id: 51,
      jc_person_id: 402,
      notes: "Mantap",
      candidate_response: null,
      status: "sent",
      created_by: 1,
      created_at: "2024-02-13T08:09:17.281Z",
      updated_at: "2024-02-13T08:09:17.281Z",
      candidate_sent_id: 124,
    },
  ];
  it("check submit", async () => {
    expect(payloadData).toEqual(response);
  });
});
