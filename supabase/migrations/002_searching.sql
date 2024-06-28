CREATE OR REPLACE FUNCTION update_search_vector() RETURNS TRIGGER AS $$ 
  BEGIN NEW.search_vector := 
    setweight(to_tsvector('english', NEW.title), 'A') || 
    setweight(to_tsvector('english', array_to_string(NEW.ingredients, ' ')),'C') || 
    setweight(to_tsvector('english', array_to_string(NEW.steps, ' ')), 'D');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER search_vector_update BEFORE
INSERT OR UPDATE ON recipes FOR EACH ROW EXECUTE FUNCTION update_search_vector();