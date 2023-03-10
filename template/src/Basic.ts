import { createEntity, createEnum, enu, itm, str, unknown } from "@wuapi/processor"
import { Entity, idd, obj } from "@wuapi/processor/lib/Definitions"

export const Status = createEnum()
.setItems({
  _Error   : itm(0).ren("Error"),
  SUCC     : itm(1),
})

export const BaseRes = createEntity().abs().res()
.setFields({
  status    : enu(Status),
  errorMsg  : str().opt(),
  errorCode : str().opt(),
  content   : unknown("C").opt(),
})

export const BaseReq = new Entity().abs().req(BaseRes)
.setFields({
  sessionId : idd().opt(),
  content   : unknown("C").opt(),
})

export const Empty = createEntity()

export const ResIgnore = createEntity().extends(BaseRes)
.know("C", obj(Empty))

