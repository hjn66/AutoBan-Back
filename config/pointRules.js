module.exports = {
  "/users/register": [
    {
      reason: "Invite User",
      userField: "inviter",
      point: 50
    },
    {
      reason: "Invite By User",
      userField: "invitee",
      point: 20
    }
  ],
  "/cars/register": [
    {
      reason: "Register second car",
      condition: {
        function: DAOs.CarDAO.Count,
        op: "=",
        value: 2
      },
      point: -50
    },
    {
      reason: "Register more than two car",
      condition: {
        function: DAOs.CarDAO.Count,
        op: ">=",
        value: 3
      },
      point: -100
    }
  ]
};
