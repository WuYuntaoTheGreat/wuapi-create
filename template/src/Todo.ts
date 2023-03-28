import { boo, createEntity, idd, lst, obj, str } from '@wuapi/processor';
import {BaseReq, BaseRes, ResIgnore} from './Basic';

export const TodoItem = createEntity()
  .setFields({
    id          : idd(),
    name        : str(),
    isComplete  : boo(),
  })

export const ReqCreateTodo = createEntity()
  .extends(BaseReq)
  .pth("/todo/create")
  .know("C", obj(TodoItem))
  .req(ResIgnore)

export const ReqUpdateTodo = createEntity()
  .extends(BaseReq)
  .pth("/todo/update")
  .know("C", obj(TodoItem))
  .req(ResIgnore)

export const ReqDeleteTodo = createEntity()
  .extends(BaseReq)
  .pth("/todo/delete")
  .know("C", idd())
  .req(ResIgnore)

export const ReqCompleteTodo = createEntity()
  .extends(BaseReq)
  .pth("/todo/complete")
  .know("C", idd())
  .req(ResIgnore)

export const ReqGetTodo = createEntity()
  .extends(BaseReq)
  .pth("/todo/get")
  .know("C", idd())
  .req("ResGetTodo", createEntity()
    .extends(BaseRes)
    .know("C", obj(TodoItem))
  )

export const ReqListTodo = createEntity()
  .extends(BaseReq)
  .pth("/todo/list")
  .know("C", boo().opt())
  .req("ResListTodo", createEntity()
    .extends(BaseRes)
    .know("C", lst(obj(TodoItem)))
  )



