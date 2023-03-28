import { BaseReq, BaseRes, ResIgnore } from './Basic';
import { createEntity, idd, obj, str, tim, url, } from '@wuapi/processor';

export const SimpleUser = createEntity()
  .setFields({
    accountId   : idd(),
    username    : str().cnf({style: "name"}),
    avatar      : url().opt().cnf({style: "avatar"}),
  })

export const User = createEntity()
  .extends(SimpleUser)
  .setFields({
    birthday    : tim().opt(),
    nationality : str().opt().cnf({style: "country"}),
    phoneNumber : str().opt().cnf({style: "phone"}),
  })

export const ReqLogin = createEntity()
  .extends(BaseReq)
  .pth("/user/login")
  .know("C", obj(
    "ReqLoginContent", createEntity()
      .setFields({
        username  : str().cnf({style: "name"}),
        password  : str().cnf({style: "short"}),
      })
  ))
  .req(
    "ResLogin", createEntity()
      .res()
      .extends(BaseRes)
      .know("C", obj(
        "ResLoginContent", createEntity()
          .setFields({
            sessionId : idd(),
            user      : obj(User),
          })
      ))
  )

export const ReqUpdateUser = createEntity()
  .extends(BaseReq)
  .pth("/user/update")
  .know("C", obj(User))
  .req(ResIgnore)

export const ReqGetUser = createEntity()
  .extends(BaseReq)
  .pth("/user/get")
  .know("C", obj(
    "ReqGetUserContent", createEntity()
      .setFields({
        accountId: idd(),
      })
  ))
  .req(
    "ResGetUser", createEntity()
      .extends(BaseRes)
      .know("C", obj(User))
  )

