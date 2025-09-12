import * as React from "react"

export type FormItemContextValue = {
  id: string
}

export const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

export const FormFieldContext = React.createContext<{ name: string }>(
  {} as { name: string }
)
