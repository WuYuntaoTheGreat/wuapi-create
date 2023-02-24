import { createEntity, createEnum, enu, int, itm, str, unknown } from "@wuapi/processor"
import { Entity } from "@wuapi/processor/lib/Definitions"

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
  number    : int(),
})

export const BaseReq = new Entity().abs().req(BaseRes)
.setFields({
  action    : str().cmt("Action"),
  content   : unknown("C").opt(),
})
