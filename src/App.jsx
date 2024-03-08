import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Tab, Nav } from "react-bootstrap";
import { format, addWeeks, compareAsc } from "date-fns";
import timezones from "./utils/timezones.json";

//methods
// import createDateInTimezone from "./utils/dateInTimezone.mjs";
import getCurrentWeek from "./utils/getCurrentWeek.mjs";
import getTimeSlots from "./utils/getTimeIntervals.mjs";
import compareTimes from "./utils/compareTimes.mjs";

const App = () => {
  const currentDate = format(new Date(), "eee, d y");

  const [weekDates, setWeekDates] = useState(null);
  const [timezone, setTimezone] = useState("");

  //date for week jumps
  const [weekToJump, setWeekToJump] = useState(0);

  //select time slots
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

  useEffect(() => {
    const weekData = getCurrentWeek(addWeeks(new Date(), weekToJump));
    setWeekDates(weekData);
  }, [weekToJump]);

  const handleCheckBoxSelection = (time) => {
    setSelectedTimeSlots((prev) => {
      return [...prev, time];
    });
  };

  return (
    <Container fluid>
      <Row className="bg-body-tertiary shadow-lg ">
        <Col className="py-3 d-flex justify-content-between align-items-baseline">
          <Button
            variant="primary"
            onClick={() => setWeekToJump((prev) => prev - 1)}
          >
            Previous Week
          </Button>
          <p className="flex-grow-1 ps-5 fs-2">{currentDate}</p>
          <Button
            variant="primary"
            onClick={() => setWeekToJump((prev) => prev + 1)}
          >
            Next Week
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className="py-3">
          <Form>
            <Form.Label>Timezones: </Form.Label>
            <Form.Select
              aria-label="Select Timezone from here"
              onSelect={(e) => setTimezone(e.target.value)}
            >
              {timezones.map((timeData, index) => (
                <option
                  value={timeData.utc}
                  key={index}
                >{`[ UTC${timeData.utc} ] - ${timeData.timezone}`}</option>
              ))}
            </Form.Select>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col className="py-3">
          <Tab.Container
            id="left-tabs-example"
            defaultActiveKey={
              weekToJump === 0 ? format(new Date(), "iii") : "Mon"
            }
          >
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  {weekDates?.map((day) => (
                    <Nav.Item key={day}>
                      <Nav.Link
                        eventKey={format(day, "iii")}
                        className="d-flex flex-column gap-2"
                      >
                        <span>{format(day, "iii")}</span>
                        <span>{format(day, "d/MM")}</span>
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  {weekDates?.map((day) => (
                    <Tab.Pane eventKey={format(day, "iii")} key={day}>
                      {compareAsc(format(new Date(), "yyyy-MM-dd"), day) === 1
                        ? "Past Day"
                        : [...getTimeSlots(timezone, String(day))].map((time) =>
                            time === "Weekend" ? (
                              <h1 key={time}>{time}</h1>
                            ) : (
                              <Form.Check
                                key={time}
                                inline
                                label={time}
                                name={time}
                                id={time}
                                type="checkbox"
                                disabled={
                                  format(new Date(), "yyyy-MM-dd") === day &&
                                  compareTimes(
                                    time,
                                    format(new Date(), "h:mm aa")
                                  ) <= 0
                                }
                                checked={selectedTimeSlots[time]}
                                onChange={() => handleCheckBoxSelection(time)}
                                className="py-5 px-4 "
                              />
                            )
                          )}
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
