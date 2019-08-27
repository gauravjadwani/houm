export const generateState: any = (J: any) => {
  const state: any = {};
  for (let i: number = 0; i < J.length; i++) {
    // console.log(J[i]);
    state[J[i].categoryName] = Array(J[i].row)
      .fill(0)
      .map(x => Array(J[i].seats).fill(0));
  }
  return state;
};

export const selectSeats: any = (
  stateGrid: number[][],
  noOfSeats: number,
  row: number,
  col: number,
) => {
  // 0=Available
  // 1=not available
  // 2=bookedSeats
  let i: number = col;
  const bookedSeats: string[] = [];
  while (noOfSeats != 0 && i < stateGrid[row].length) {
    if (stateGrid[row][i] === 1) {
      console.log('breaked', noOfSeats);
      break;
    }
    stateGrid[row][i] = 2;
    bookedSeats.push(row.toString() + i.toString());
    noOfSeats--;
    i++;
  }
  return { stateGrid, noOfSeats , bookedSeats};
};
// console.log(generateState(J));
