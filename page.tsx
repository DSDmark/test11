import { useEffect, useState } from "react"

const Index = () => {
  const [state, setState] = useState({
    value: "",
    dataList: [],
    isLoading: false,
  })

  // api call
  const fetchData = async () => {
    setState(prevState => ({ ...prevState, isLoading: true }))
    const response = await fetch(`https://api.example.com/data?search=${state.value}`)
    if (!response.ok) {
      setState(prevState => ({ ...prevState, isLoading: false }))
      const data = await response.json()
      setState({ data: data.value })
      setState(prevState => ({ ...prevState, isLoading: false }))
    }
  }

  useEffect(() => {
    fetchData()
  }, [state.value])
  return (
    <div>
      <input type="text" value={state.value} onChange={e => setState({ value: e.target.value })} />
      {state.dataList?.length ? (
        state.dataList.map((item, index) => <div key={index}>{item}</div>)
      ) : (
        <div>{state.isLoading ? "Loading..." : "No data found"}</div>
      )}
    </div>
  )
}

export default Index

