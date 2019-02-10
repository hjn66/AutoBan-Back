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
      reason: "Register more than one car",
      condition: {
        function: DAOs.CarDAO.Count,
        period: "D1",
        op: ">=",
        value: 1
      },
      point: -30
    }
  ]
};
