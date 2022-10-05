The `compose` function wraps the `Handler` with one or more `Wrapper`. The first
argument of `Wrapper` is the function `Wrapped` (a copy of `Handler`).
Subsequent arguments of `Wrapper` are the same as those of `Handler`. Each
`Wrapper` is called in chain with `Wrapped`. The same arguments must be passed
to `Wrapped` as to `Handler`.
