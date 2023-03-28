import { createEntity, createEnum, enu, itm, str, unknown } from "@wuapi/processor"
import { idd, obj } from "@wuapi/processor/lib/Definitions"

export const Status = createEnum()
  .setItems({
    _Error   : itm(0).ren("Error"),
    SUCC     : itm(1),
  })

export const BaseRes = createEntity()
  .abs()
  .res()
  .setFields({
    status    : enu(Status).cnf({fixed: "Status.SUCC"}),
    errorMsg  : str().opt().cnf({fixed: "null"}),
    errorCode : str().opt().cnf({fixed: "null"}),
    content   : unknown("C").opt(),
  })

export const BaseReq = createEntity()
  .abs()
  .req(BaseRes)
  .setFields({
    sessionId : idd().opt(),
    content   : unknown("C").opt(),
  })

export const Empty = createEntity()

export const ResIgnore = createEntity()
  .extends(BaseRes)
  .know("C", obj(Empty))

