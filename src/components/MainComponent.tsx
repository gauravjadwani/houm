import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dump from './../seats.json';
import { generateState, selectSeats, getPrice, bookSeats} from './../Utilities/Utils';

export default class Clock extends React.Component<
  {},
  {
    data: any;
    open: boolean;
    noOfSeats: number;
    amount:number;
    seatsList:any;
    booked:boolean
  }
> {
  constructor() {
    super({});
    this.state = {
      data: generateState(Dump),
      noOfSeats: 0,
      open: true,
      amount:0,
      seatsList:[],
      booked:false
    };
  }
  public handleGridClick = (
    e: any,
    row: number,
    col: number,
    categoryName: string,
  ) => {
    const price: number = getPrice(categoryName,Dump);
    if(this.state.data[categoryName][row][col] === 2){
      const tempState: any = { ...this.state.data };
      tempState[categoryName][row][col] = 0;
      let noOfSeats=this.state.noOfSeats;
      let amount=this.state.amount;
      amount=amount-price;
      const seatsList=[...this.state.seatsList];
      seatsList.pop();
      this.setState({ data: tempState, noOfSeats: ++noOfSeats ,amount,seatsList});
    }
    else if(this.state.noOfSeats > 0){
      const status: any = selectSeats(
        this.state.data[categoryName],
        this.state.noOfSeats,
        row,
        col,
        categoryName,
        Dump
      );
      const tempState: any = { ...this.state.data };
      const amount =this.state.amount;

      tempState[categoryName] = status.stateGrid;
      this.setState({ data: tempState, noOfSeats: status.noOfSeats,amount:amount + status.amount });
    }


  };
  public handleSeatsCount=(e:any,noOfSeats:number)=>{
    if(this.state.noOfSeats !== noOfSeats){
      this.setState({noOfSeats});
      this.handleDialogState(false);
    }
  }
  public handleSeatsBook = () => {
    let tempState={...this.state.data}
    let newState=bookSeats(tempState);
    this.setState({data:newState,open:true,booked:true})
  };
  public handleDialogState = (action:boolean) => {
    this.setState({open:action});
  };
  public handleBookMore = ()=>{
    this.setState({noOfSeats:0,amount:0,booked:false});
    this.handleDialogState(true);
  }
  public renderDialog = () => {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={()=>this.handleDialogState(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title"> {(this.state.booked)?('Confirmation'):('Select Seats')}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {(this.state.booked)?('Congrats'):('kindly select the number of seats')}
            </DialogContentText>
              {
              (this.state.booked)?(`Congratulation you have 
              booked seats of worth ${this.state.amount}`):(
                (new Array(10).fill(0)).map((i, k) => (
                  <div className={(this.state.noOfSeats===(k+1))?("unit selectedSeats"):("unit")} key="1" onClick={(e)=>this.handleSeatsCount(e,k+1)}>{k+1}</div>
                )
                )
              )
              }

          </DialogContent>
          <DialogActions>
          {
            (this.state.booked === false)?(null):(
              <Button onClick={this.handleBookMore} color="primary">
                Book More
              </Button>
            )
          }
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
                  2 ===
                  this.state.data[props.data.categoryName][
                    parseInt(keyrow.toString(10), 10)
                  ][parseInt(key.toString(10), 10)]
                    ? 'unit selectedSeats'
                    : ((
                      1 ===
                      this.state.data[props.data.categoryName][
                        parseInt(keyrow.toString(10), 10)
                      ][parseInt(key.toString(10), 10)]
                    )?('unit bookedSeats'):('unit'))
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
    return (
      <div className="rowContainer">
        {Dump.map((key, index) => (
          <this.buildSeats data={key} key={0} />
        ))}
      </div>
    );
  };

  public render() {
    return (
    <div>
      <this.singleUnit/>
      <this.renderDialog/>
      <div>No of seats Remaining:{this.state.noOfSeats}</div>
      <div>Total price :{this.state.amount}</div>
      {
        (this.state.noOfSeats === 0 && this.state.open === false)?(<button className="btn btn-primary" onClick={this.handleSeatsBook}>accept and book</button>):(null)
      }
     
      </div>
      );
  }
}
