import React, { useState } from 'react';
import { Row, Input } from 'antd';

export default ({
  onSearch
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false)

  const _onChangeSearch = (event) => setSearchValue(event.target.value)

  const _onSearch = async () => {
    if (typeof onSearch === 'function') {
      setLoading(true)
      await onSearch(searchValue.split(" "))
      setLoading(false)
    }
  }

  return (
    <Row>
      <Input.Search
        value={searchValue}
        onChange={_onChangeSearch}
        onSearch={_onSearch}
        loading={loading}
      />
    </Row>
  )
}