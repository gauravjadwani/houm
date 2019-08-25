import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'
// import { thisExpression } from '@babel/types';
import J from './../seats.json';
// import { thisExpression } from '@babel/types';


export default class Clock extends React.Component<{}, 
{
  data: any[][];
  open: boolean;
  noOfSeats:Number;
}> {
  constructor(){
    super({});
   this.state={
     data:(Array(10).fill(0).map(x => Array(15).fill(0))),
     open:false,
     noOfSeats:5
   } 
  }
  handleClick=()=>{

  }
  handleDialogClose=()=>{

  }
  renderDialog=()=>{
    return(
      <div>
      <Button variant="outlined" color="primary" onClick={this.handleDialogClose}>
        Open form dialog
      </Button>
      <Dialog open={this.state.open} onClose={this.handleDialogClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleDialogClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
  }
  buildSeats=(props:any)=>{
    console.log('propspss',props);
    return(
      <div>
        <div className="customHeading">{props.data.categoryName}</div>
        {
          (new Array(props.data.row)).fill(0).map((indexrow,keyrow)=>(
            (
              <div className="row">
            <div className="catName">{String.fromCharCode( props.data.startingRowIndex.charCodeAt(0) + keyrow )}</div>
            {
              (new Array(props.data.seats)).fill(0).map((index,key) => 
                <div className="unit"data-value={String.fromCharCode( props.data.startingRowIndex.charCodeAt(0) + keyrow ) + (key+1)}
                data-value1={keyrow.toString(10)+key.toString(10)} onClick={()=>this.handleClick()}>{key + 1}</div>
              )
            }
              </div>
            )
          ))
        }
      </div>
    )
  }
  singleUnit=(props:any)=>{
    console.log('lolololol',J);
    // props.value=1;
  
    return(
      <div className="rowContainer">
        {
          J.map((key,index) =>
          <this.buildSeats data={key}/>
          )
        }
      </div>
    )
  }
  

  render() {
    return (<this.singleUnit/>);
  }
}
// (new Array(15)).fill(0).map((index,key) => 
// <div className="unit">{key}</div>
// )

{/* <div className="rowContainer">
<div className="customHeading">Club</div>
{
  (new Array(10)).fill(0).map((index1,key1) => 
    (
      <div className="row">
    <div className="catName">{String.fromCharCode( 65 + key1 )}</div>
    {
      (new Array(15)).fill(0).map((index,key) => 
        <div className="unit">{key}</div>
      )
    }
      </div>
    )
  )
}
</div> */}