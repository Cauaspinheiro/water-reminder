export default function objectAreEqual(
  obj1: Record<string, any>,
  obj2: Record<string, any>
): boolean {
  let isEqual = true

  for (const key in obj1) {
    if (Object.prototype.hasOwnProperty.call(obj1, key)) {
      if (obj1[key] != obj2[key]) isEqual = false
    }
  }

  return isEqual
}
