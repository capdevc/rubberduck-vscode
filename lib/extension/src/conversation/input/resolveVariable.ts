import { getFilename } from "./getFilename";
import { getLanguage } from "./getLanguage";
import { getSelectedText } from "./getSelectedText";
import { Variable } from "../template/ConversationTemplate";
import { Message } from "../../prompt/ConversationSection";
import { getSelectedLocationText } from "./getSelectedLocationText";

export async function resolveVariable(
  variable: Variable,
  { messages }: { messages?: Array<Message> } = {}
): Promise<unknown> {
  const variableType = variable.type;
  switch (variableType) {
    case "constant":
      return variable.value;
    case "active-editor": {
      const property = variable.property;
      switch (property) {
        case "filename":
          return getFilename();
        case "selected-text":
          return getSelectedText();
        case "selected-location-text":
          return getSelectedLocationText();
        case "language-id":
          return getLanguage();
        default: {
          const exhaustiveCheck: never = property;
          throw new Error(`unsupported property: ${exhaustiveCheck}`);
        }
      }
    }
    case "message":
      return messages?.at(variable.index)?.[variable.property];
    default: {
      const exhaustiveCheck: never = variableType;
      throw new Error(`unsupported type: ${exhaustiveCheck}`);
    }
  }
}