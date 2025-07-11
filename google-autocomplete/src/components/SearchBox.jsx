import React, { useState } from 'react';
import { Input, List, Card, Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { searchPlace, setSelectedPlace } from '../redux/actions';
import { GOOGLE_API_KEY } from '../config';

const SearchBox = () => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const results = useSelector((state) => state.results);
  const dispatch = useDispatch();

  const fetchSuggestions = async (value) => {
    try {
      const res = await fetch(`http://localhost:5050/api/search?query=${encodeURIComponent(value)}`);
      const data = await res.json();
      setSuggestions(data.results);
    } catch (err) {
      console.error('Autocomplete error:', err);
      setSuggestions([]);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (value.trim()) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (place) => {
    setInput(place.name);
    setSuggestions([]);
    dispatch(searchPlace(place.name));
    dispatch(setSelectedPlace(place));
  };

  return (
    <div style={{ padding: 24, position: 'relative' }}>
      <Input value={input} onChange={handleChange} placeholder="Search a place..." style={{ marginBottom: 8 }} />

      {suggestions.length > 0 && (
        <List
          bordered
          size="small"
          style={{
            position: 'absolute',
            top: 56,
            width: '100%',
            zIndex: 1000,
            maxHeight: 200,
            overflowY: 'auto',
            background: '#fff',
            boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
          }}
          dataSource={suggestions}
          renderItem={(item) => (
            <List.Item style={{ cursor: 'pointer' }} onClick={() => handleSelect(item)}>
              {item.name}
            </List.Item>
          )}
        />
      )}

      {results.length > 0 && (
        <Carousel dots={false} arrows swipeToSlide slidesToShow={Math.min(results.length, 5)} style={{ marginTop: 32 }}>
          {results.map((place, index) => (
            <div key={index} style={{ padding: '0 8px', display: 'flex', justifyContent: 'center' }}>
              <Card
                hoverable
                style={{
                  width: 300,
                  height: 360,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
                cover={
                  place.photos?.[0] ? (
                    <img
                      alt={place.name}
                      src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=${place.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`}
                      style={{
                        width: '300px',
                        height: '200px',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '300px',
                        height: '200px',
                        background: '#eee',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 14,
                        color: '#999',
                      }}
                    >
                      No photo available
                    </div>
                  )
                }
                onClick={() => dispatch(setSelectedPlace(place))}
              >
                <Card.Meta
                  title={place.name}
                  description={
                    <div
                      style={{
                        maxHeight: '90px',
                        overflowY: 'auto',
                        paddingRight: 6,
                      }}
                    >
                      <p style={{ marginBottom: 0 }}>{place.formatted_address}</p>
                    </div>
                  }
                />
              </Card>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default SearchBox;
