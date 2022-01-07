import * as React from 'react';
import styles from './MeetingAssistApp.module.scss';
import { IMeetingAssistAppProps } from './IMeetingAssistAppProps';
import { IMeetingAssistAppState } from './IMeetingAssistAppState';
import { escape } from '@microsoft/sp-lodash-subset';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useRef } from 'react';

import * as jQuery from "jquery";
import * as bootstrap from "bootstrap";
require('../../../../node_modules/bootstrap/dist/css/bootstrap.min.css');




export default class MeetingAssistApp extends React.Component<IMeetingAssistAppProps, IMeetingAssistAppState,{}> {
   
  constructor(props){
    super(props);
    this.state = {
      title:"Test",
      isOpen:false,
      data:[
        
      ],
      newBoard:{
        name: '', count: 2,  members:[]
      },
      defaultBoardName:'Board 1',
      initialBoardName:'Board 1',
      defaultUsers: [
        { name: "Ganeshan", isActive: false, classActive: 'badge badge-pill badge-primary ' + styles.ub, classInactive: 'badge badge-pill badge-light ' + styles.ub + ' ' + styles.ubInactive},
        { name: "Pratik", isActive: false, classActive: 'badge badge-pill badge-primary ' + styles.ub, classInactive: 'badge badge-pill badge-light ' + styles.ub  + ' ' + styles.ubInactive},
        { name: "Jitendra", isActive: false, classActive: 'badge badge-pill badge-primary ' + styles.ub, classInactive: 'badge badge-pill badge-light ' + styles.ub  + ' ' + styles.ubInactive},
        { name: "Jatin", isActive: false, classActive: 'badge badge-pill badge-primary ' + styles.ub, classInactive: 'badge badge-pill badge-light ' + styles.ub  + ' ' + styles.ubInactive}
    ],
    initialUsersList:[
      { name: "Ganeshan", isActive: false, classActive: 'badge badge-pill badge-primary ' + styles.ub, classInactive: 'badge badge-pill badge-light ' + styles.ub + ' ' + styles.ubInactive},
      { name: "Pratik", isActive: false, classActive: 'badge badge-pill badge-primary ' + styles.ub, classInactive: 'badge badge-pill badge-light ' + styles.ub  + ' ' + styles.ubInactive},
      { name: "Jitendra", isActive: false, classActive: 'badge badge-pill badge-primary ' + styles.ub, classInactive: 'badge badge-pill badge-light ' + styles.ub  + ' ' + styles.ubInactive},
      { name: "Jatin", isActive: false, classActive: 'badge badge-pill badge-primary ' + styles.ub, classInactive: 'badge badge-pill badge-light ' + styles.ub  + ' ' + styles.ubInactive}
  ],
      active: false      
    };
    
  }

  openModal(){
    this.setState({
      isOpen:true
    });
  }

  closeModal(e){
    e.preventDefault();    
    this.setState(prevState => ({
      isOpen:false, 
      initialBoardName:"Board 1",     
      /*defaultBoardName: 'Board 1',
      defaultUsers:{
        ...prevState.defaultUsers,
        isActive: false
      }*/
    }));
  }

  addMember(index){
    let tmp = this.state.defaultUsers;
    tmp[index].isActive = !tmp[index].isActive;
    this.setState({ defaultUsers: tmp });
  }

  addRow = () => {
    //e.preventDefault();
    console.log("Start");
    let newMembersList = [];
    console.log(newMembersList);
    let selectedMembers = this.state.defaultUsers.filter(p=>p.isActive==true);
    console.log(selectedMembers)
    Object.keys(selectedMembers).forEach(function(key) {
      newMembersList.push(selectedMembers[key].name);
    });
    console.log(newMembersList)
    const newBoard = {name: this.state.initialBoardName, count: newMembersList.length,  members:newMembersList};
    console.log(newBoard);
    this.setState(prevState => ({
      data: [...prevState.data, 
        newBoard
      ],
      isOpen:false,      
      initialBoardName: this.state.defaultBoardName
      // defaultUsers:{
      //   ...prevState.defaultUsers,
      //   isActive: false
      // }

    }));
  }

  addNewBoard = (event) => {
    event.preventDefault();
    this.setState({
      initialBoardName: event.target.value
    });
    console.log(event.target.value);
    console.log(this.state.initialBoardName);
    console.log(this.state.defaultBoardName);
  }




  
  

  public render(): React.ReactElement<IMeetingAssistAppProps> {

    const btnConfirmClasses = 'btn btn-primary' + ' ' + styles.confirm;
    const btnDiscardClasses = 'btn btn-outline-primary' + ' ' + styles.discard;
    const badgeUserPill = 'badge badge-pill badge-primary'+ ' ' + styles.ub;
    const tblContainerClass = 'row ' + styles.tblParent;
    return ( 
      // <div className={ styles.meetingAssistApp }>
      //   {/* <button onClick={() => this.openModal()}>Open Modal</button> */}
        
        
      // </div>   
     
     
     
      <div className={ styles.meetingAssistApp }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Step -1 Create Board</span>
              <p className={ styles.subTitle }>Boards will help you add multiple people at once while creating a meeting invite.</p>
              {/* <p className={ styles.description }>{escape(this.props.description)}</p> */}
              <a href="#" className={ styles.button } onClick={() => this.openModal()}>
                <span className={ styles.label } >+ Add a Board</span>
              </a>
            </div>
          </div>
        </div>
          {this.state.isOpen && <div className={ styles.popupBox }>
          <div className={styles.box}>
              {/* <button className={styles.btnClose} onClick={() => this.closeModal()}>X</button> */}
              {/* <label>
                Board name
                <input type="text" name="name" />
              </label> 
              <br/>
              <label>
                Add members
                <input type="text" name="members" />
              </label> 
              <br/>
              <button >Discard</button>
              <button >Confirm</button>  */}
              <form>
                <div className="form-group">
                  <label>
                    Group name
                    <input type="text"  onChange={this.addNewBoard} className="form-control" id="exampleInputEmail1"  value={this.state.initialBoardName} />
                  </label>
                </div>
                <div className="form-group">
                  <label>Add members
                    <div className={styles.memberContainer}>
                      {this.state.defaultUsers.map((p, index)=>(<span key={index} onClick={() => this.addMember(index)} className={p.isActive?p.classActive:p.classInactive}>{p.name}</span>))}                    
                    </div>

                  {/* <input type="text" className="form-control" id="exampleInputPassword1" placeholder="" value={this.state.newBoard.members.map((p)=>({p}))}/> */}
                  </label>
                </div>                 
                <input type='button' className={btnDiscardClasses} onClick={(e) => this.closeModal(e)} value='Discard'/>  
                <input type='button' className={btnConfirmClasses}  onClick={() => this.addRow()} value='Confirm' />             
               
              </form>
                       
          </div>
        </div>
        }

        <div className={ styles.container }>
          <div className={tblContainerClass}>
          <table className={styles.boardTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Number of members</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.data.map((m) => (
                  <tr>
                    <td>{m.name}</td>
                    <td>{m.count}</td>
                    <td>{m.members.map((p)=>(<span className={badgeUserPill}>{p}</span>))}</td>
                   
                  </tr>
                ))
            }
            </tbody>
          </table>
          </div>
        </div>
      </div>

    );
  }
}

