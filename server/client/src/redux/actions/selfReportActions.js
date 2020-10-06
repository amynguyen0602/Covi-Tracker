export const addVisit = (visit) => {
  console.log("actioncreater visit:" + visit.place);
  return {
    type: 'ADD_VISIT',
    payload: visit,
  }
}
