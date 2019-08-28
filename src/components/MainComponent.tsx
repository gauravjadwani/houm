import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
// import { thisExpression } from '@babel/types';
import J from './../seats.json';
import { generateState, selectSeats, getPrice } from './../Utilities/Utils';
// import { thisExpression } from '@babel/types';

export default class Clock extends React.Component<
  {},
  {
    data: any;
    open: boolean;
    noOfSeats: number;
    amount:number;
  }
> {
  constructor() {
    super({});
    this.state = {
      data: generateState(J),
      noOfSeats: 0,
      open: true,
      amount:0
    };
  }
  public handleGridClick = (
    e: any,
    row: number,
    col: number,
    categoryName: string,
  ) => {
    const price: number = getPrice(categoryName,J);
    console.log('pppp',price);
    if(this.state.data[categoryName][row][col] === 2){
      const tempState: any = { ...this.state.data };
      tempState.categoryName[row][col] = 0;
      let noOfSeats=this.state.noOfSeats;
      let amount=this.state.amount;
      amount=amount-price;
      // tempState.categoryName = status.stateGrid;
      this.setState({ data: tempState, noOfSeats: ++noOfSeats ,amount});
      console.log('STATUSif', tempState);
    }
    else if(this.state.noOfSeats > 0){
      const status: any = selectSeats(
        this.state.data[categoryName],
        this.state.noOfSeats,
        row,
        col,
      );
      const tempState: any = { ...this.state.data };
      const bookedSeats:number=status.bookedSeats.length;
      const amount =bookedSeats * price;

      tempState.categoryName = status.stateGrid;
      this.setState({ data: tempState, noOfSeats: status.noOfSeats,amount });
      // console.log('STATUS',(tempState[categoryName].price),amount);
    }


  };
  public handleSeatsCount=(e:any,noOfSeats:number)=>{
    if(this.state.noOfSeats !== noOfSeats){
      this.setState({noOfSeats});
    }
  }
  public handleDialogClose = () => {};
  public handleDialogState = (action:boolean) => {
    this.setState({open:action});
  };
  public renderDialog = () => {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleDialogClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
              {
                (new Array(10).fill(0)).map((i, k) => (
                  <div className={(this.state.noOfSeats==(k+1))?("unit selectedSeats"):("unit")} key="1" onClick={(e)=>this.handleSeatsCount(e,k+1)}>{k+1}</div>
                )
                )
              }

          </DialogContent>
          <DialogActions>
            <Button onClick={()=>this.handleDialogState(false)} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  public buildSeats = (props: any) => {
    console.log('propspss', props);
    return (
      <div>
        <div className="customHeading">{props.data.categoryName + ' '+props.data.price}</div>
        {new Array(props.data.row).fill(0).map((indexrow, keyrow) => (
          // tslint:disable-next-line: jsx-key
          <div className="row">
            <div className="catName">
              {String.fromCharCode(
                props.data.startingRowIndex.charCodeAt(0) + keyrow,
              )}
            </div>
            {new Array(props.data.seats).fill(0).map((_index, key) => (
              <div
                className={
                  2 ==
                  this.state.data[props.data.categoryName][
                    parseInt(keyrow.toString(10), 10)
                  ][parseInt(key.toString(10), 10)]
                    ? 'unit selectedSeats'
                    : 'unit'
                }
                data-value={keyrow.toString(10) + key.toString(10)}
                data-category={props.data.categoryName}
                data-row={keyrow}
                data-col={key}
                onClick={e =>
                  this.handleGridClick(e, keyrow, key, props.data.categoryName)
                }
              >
                {key + 1}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };
  public singleUnit = (props: any) => {
    console.log('lolololol', J);
    // props.value=1;

    return (
      <div className="rowContainer">
        {J.map((key, index) => (
          <this.buildSeats data={key} key={0} />
        ))}
      </div>
    );
  };

  public render() {
    // console.log('render', this.state.data);
    return (
    <div>
     
      <this.singleUnit/>
      <this.renderDialog/>
      No of seats Remaining:{this.state.noOfSeats}
      Total price :{this.state.amount}
      </div>);
  }
}
