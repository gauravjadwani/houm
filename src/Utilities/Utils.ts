export const generateState: any = (Dump: any) => {
  const state: any = {};
  for (let i: number = 0; i < Dump.length; i++) {
    state[Dump[i].categoryName] = Array(Dump[i].row)
      .fill(0)
      .map(x => Array(Dump[i].seats).fill(0));
  }
  return state;
};

export const selectSeats: any = (
  stateGrid: number[][],
  noOfSeats: number,
  row: number,
  col: number,
  categoryName:string,
  Dump:any
) => {
  // 0=Available
  // 1=not available
  // 2=bookedSeats
  let price=getPrice(categoryName,Dump);
  let i: number = col;
  const bookedSeats: string[] = [];
  let amount:number=0;
  while (noOfSeats !== 0 && i < stateGrid[row].length) {
    if (stateGrid[row][i] === 1) {
      break;
    }
    amount=amount+price;
    stateGrid[row][i] = 2;
    bookedSeats.push(row.toString() + i.toString());
    noOfSeats--;
    i++;
  }
  return { stateGrid, noOfSeats, bookedSeats, amount };
};
export const bookSeats = (data: any[][]) => {
  for (let key in data) {
    for (let row: number = 0; row < data[key].length; row++) {
      for (let col: any = 0; col < data[key][row].length; col++) {
        if (data[key][row][col] === 2) {
          data[key][row][col] = 1;
        }
      }
    }
  }
  return data;
};
export const getPrice: any = (categoryName: string, Dump: any) => {
  for (let i: number = 0; i < Dump.length; i++) {
    if (Dump[i]['categoryName'] === categoryName) {
      return Dump[i].price;
    }
  }
  return null;
};
