import { BaseReq, BaseRes, Empty, ResIgnore } from './Basic';
import { createEntity, idd, int, lst, obj, str, tim } from '@wuapi/processor';

export const SimpleUser = createEntity()
  .setFields({
    accountId   : idd(),
    username    : str(),
    avatar      : str().opt(),
  })

export const User = createEntity()
  .extends(SimpleUser)
  .setFields({
    birthday    : tim().opt(),
    nationality : str().opt(),
    phoneNumber : str().opt(),
  })

export const ReqLogin = createEntity()
  .extends(BaseReq)
  .pth("user/login")
  .know("C", obj({
    ReqLoginContent: createEntity()
      .setFields({
        username  : str(),
        password  : str(),
      })
  }))
  .req({
    ResLogin: createEntity()
      .res()
      .extends(BaseRes)
      .know("C", obj({
        ResLoginContent: createEntity()
        .setFields({
          sessionId : idd(),
          user      : obj(User),
        })
      }))
  })

export const ReqUpdateUser = createEntity()
  .extends(BaseReq)
  .pth("user/update")
  .know("C", obj(User))
  .req(ResIgnore)

export const ReqGetUser = createEntity()
  .extends(BaseReq)
  .pth("user/get")
  .know("C", obj({
    ReqGetUserContent: createEntity()
      .setFields({
        accountId: idd(),
      })
  }))
  .req({
    ResGetUser: createEntity()
      .extends(BaseRes)
      .know("C", obj(User))
  })

export const ReqGetFriends = createEntity()
  .extends(BaseReq)
  .pth("user/friends")
  .know("C", obj(Empty))
  .req({
    ResGetFriends: createEntity()
      .extends(BaseRes)
      .know("C", obj({
        ResGetFriendsContent: createEntity()
          .setFields({
            total: int(),
            content: lst(obj(User)),
          })
      }))
  })


