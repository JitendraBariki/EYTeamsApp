export interface IMeetingAssistAppState {
    title: string,
    isOpen: boolean,
    data:{ 
      name: string, 
      count: number,  
      members:string[]
    }[],
    newBoard:{ 
      name: string, 
      count: number,  
      members:string[]
    },
    defaultBoardName: string,
    initialBoardName: string,
    defaultUsers: {
      name: string, 
      isActive: boolean, 
      classActive: string,
      classInactive: string
    }[],
    initialUsersList:{
      name: string, 
      isActive: boolean, 
      classActive: string,
      classInactive: string
    }[],
    active:boolean
  }