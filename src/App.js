import React, { Component } from 'react';
import './App.scss';
import { Typography, Select, InputNumber } from 'antd';

const wordSizes = [16, 24, 32];
const sampleRates = [44.1, 48, 88.2, 96, 192];

class App extends Component {
  constructor() {
    super();

    this.state = {
      wordSize: 24,
      sampleRate: 48,
      tracks: 24,
      hours: 1,
      minutes: 20,
      total: 0,
    };
  }

  recalc() {
    const { wordSize, sampleRate, tracks, hours, minutes } = this.state;

    this.setState({
      total:
        wordSize * sampleRate * 1000 * tracks * ((hours * 60 + minutes) * 60),
    });
  }

  renderSize(totalBits) {
    const gigabytes = this.state.total / 8589934592;
    const megabytes = this.state.total / 8388608;
    return (
      <span>
        {gigabytes < 1 ? (
          <span>
            {Math.round(megabytes * 100) / 100}
            MB{' '}
          </span>
        ) : (
          <span>{Math.round(gigabytes * 100) / 100} GB </span>
        )}
      </span>
    );
  }

  render() {
    const { wordSize, sampleRate, tracks, hours, minutes } = this.state;

    return (
      <div className="App">
        <Typography.Title level={2}>
          Audio File Size Calculator
        </Typography.Title>
        <div className="calculator-elements">
          <div className="calculator-element">
            <label for="">
              <Typography.Text className="input-label">
                Word Size
              </Typography.Text>
              <Select
                value={wordSize}
                onChange={v => this.setState({ wordSize: v }, this.recalc)}
              >
                {wordSizes.map(option => (
                  <Select.Option key={option} value={option}>
                    {option}-bit
                  </Select.Option>
                ))}
              </Select>
            </label>
          </div>
          <div className="calculator-element">
            <label for="">
              <Typography.Text className="input-label">
                Sample Rate
              </Typography.Text>
              <Select
                value={sampleRate}
                onChange={v => this.setState({ sampleRate: v }, this.recalc)}
              >
                {sampleRates.map(option => (
                  <Select.Option key={option} value={option}>
                    {option} kHz
                  </Select.Option>
                ))}
              </Select>
            </label>
          </div>
          <div className="calculator-element">
            <label for="">
              <Typography.Text className="input-label">Tracks</Typography.Text>
              <div className="input-section track-number">
                <InputNumber
                  value={tracks}
                  min={1}
                  max={1000}
                  onChange={v => this.setState({ tracks: v }, this.recalc)}
                />
              </div>
            </label>
          </div>
          <div className="calculator-element">
            <label for="">
              <Typography.Text className="input-label">
                Recording Length
              </Typography.Text>
              <div className="input-section song-length">
                <InputNumber
                  value={hours}
                  min={0}
                  max={1000}
                  onChange={v => this.setState({ hours: v }, this.recalc)}
                />
                <Typography.Text className="time-label">h</Typography.Text>
                <InputNumber
                  value={minutes}
                  min={0}
                  max={59}
                  onChange={v => this.setState({ minutes: v }, this.recalc)}
                />
                <Typography.Text className="time-label">m</Typography.Text>
              </div>
            </label>
          </div>
          <div className="seperator calculator-element" />
          <div className="calculator-element">
            <Typography.Title level={3} className="input-label">
              Total Size:
            </Typography.Title>
            <Typography.Title level={3} className="total-size">
              {this.renderSize(this.state.total)}
            </Typography.Title>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
