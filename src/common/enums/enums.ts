export enum TaskStatus {
   New = 0, //если isDone:false
   InProgress = 1,
   Completed = 2, //если isDone:true
   Draft = 3,
}

export enum TaskPriorities {
   Low = 0,
   Middle = 1,
   Hi = 2,
   Urgently = 3,
   Later = 4,
}
